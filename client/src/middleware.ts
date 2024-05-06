import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import cookie from 'cookie';
import {
	CSRF_TOKEN,
	CSRF_MAX_AGE,
	CSRF_SAME_SITE,
	ACCESS,
	REFRESH,
	HTTP_ONLY,
	MAX_AGE,
	PATH,
	SAME_SITE,
	SECURE,
} from '@/utils/constants';
import paths from '@/utils/paths';

export async function middleware(request: NextRequest) {
	const response = NextResponse.next();

	let csrfToken = request.cookies.get(CSRF_TOKEN)?.value;
	if (!csrfToken) {
		const csrfRes = await fetch(
			`${process.env.NEXT_PUBLIC_HOST}/admin/csrf/`,
			{
				method: 'GET',
				headers: request.headers,
			}
		);
		const csrfResCookies = csrfRes.headers.getSetCookie();

		for (const c of csrfResCookies) {
			const parsedCookie = cookie.parse(c);

			if (CSRF_TOKEN in parsedCookie) {
				csrfToken = parsedCookie.csrftoken;

				response.cookies.set({
					name: CSRF_TOKEN,
					value: parsedCookie.csrftoken,
					expires: new Date(parsedCookie.expires),
					httpOnly: false,
					maxAge: CSRF_MAX_AGE,
					domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
					path: PATH,
					sameSite: CSRF_SAME_SITE,
					secure: SECURE,
				});
			}
		}
	}

	if (request.nextUrl.pathname.startsWith(paths.adminLogin())) {
		return response;
	}

	const token = request.cookies.get(ACCESS)?.value;

	if (!token) {
		return NextResponse.redirect(new URL(paths.adminLogin(), request.url));
	}

	let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/admin/jwt/verify/`, {
		method: 'POST',
		headers: {
			Cookie: request.cookies.toString(),
			Accept: 'application/json',
			'Content-Type': 'application/json',
			'X-CSRFToken': csrfToken || '',
			Referer: process.env.NEXT_PUBLIC_REFERER || '',
		},
	});

	if (res.status === 400 || res.status === 403) {
		return NextResponse.redirect(new URL(paths.adminLogin(), request.url));
	}

	if (res.status === 401) {
		const refreshToken = request.cookies.get(REFRESH)?.value;

		if (!refreshToken) {
			return NextResponse.redirect(
				new URL(paths.adminLogin(), request.url)
			);
		}

		const refreshRes = await fetch(
			`${process.env.NEXT_PUBLIC_HOST}/admin/jwt/refresh/`,
			{
				method: 'POST',
				headers: {
					Cookie: request.cookies.toString(),
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'X-CSRFToken': csrfToken || '',
					Referer: process.env.NEXT_PUBLIC_REFERER || '',
				},
			}
		);

		if (refreshRes.status === 400 || refreshRes.status === 403) {
			return NextResponse.redirect(
				new URL(paths.adminLogin(), request.url)
			);
		}

		const resCookies = refreshRes.headers.getSetCookie();

		let accessToken = '';
		for (const c of resCookies) {
			const parsedCookie = cookie.parse(c);

			if (ACCESS in parsedCookie) {
				accessToken = parsedCookie.access;

				response.cookies.set({
					name: ACCESS,
					value: parsedCookie.access,
					expires: new Date(parsedCookie.expires),
					httpOnly: HTTP_ONLY,
					maxAge: MAX_AGE,
					domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
					path: PATH,
					sameSite: SAME_SITE,
					secure: SECURE,
				});
			} else if (REFRESH in parsedCookie) {
				response.cookies.set({
					name: REFRESH,
					value: parsedCookie.refresh,
					expires: new Date(parsedCookie.expires),
					httpOnly: HTTP_ONLY,
					maxAge: MAX_AGE,
					domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
					path: PATH,
					sameSite: SAME_SITE,
					secure: SECURE,
				});
			}
		}

		if (!accessToken) {
			return NextResponse.redirect(
				new URL(paths.adminLogin(), request.url)
			);
		}

		const updatedCookies = [
			`${ACCESS}=${accessToken}`,
			`${CSRF_TOKEN}=${csrfToken}`,
		].join('; ');

		res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/admin/jwt/verify/`, {
			method: 'POST',
			headers: {
				Cookie: updatedCookies,
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'X-CSRFToken': csrfToken || '',
				Referer: process.env.NEXT_PUBLIC_REFERER || '',
			},
		});

		if (res.status === 400 || res.status === 403) {
			return NextResponse.redirect(
				new URL(paths.adminLogin(), request.url)
			);
		}

		if (res.status === 401) {
			return NextResponse.redirect(
				new URL(paths.adminLogin(), request.url)
			);
		}

		return response;
	}

	return response;
}

export const config = {
	matcher: '/admin/:path*',
};
