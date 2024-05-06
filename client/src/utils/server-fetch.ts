import { cookies } from 'next/headers';
import cookie from 'cookie';
import { ACCESS, CSRF_TOKEN } from '@/utils/constants';

export async function serverFetch(url: string, options: any): Promise<any> {
	let response = await fetch(url, options);

	if (response.status === 403) {
		return response;
	}

	const csrfToken = cookies().get('csrftoken')?.value;

	if (!csrfToken) {
		return response;
	}

	if (response.status === 401) {
		const refreshRes = await fetch(
			`${process.env.NEXT_PUBLIC_HOST}/admin/jwt/refresh/`,
			{
				method: 'POST',
				headers: {
					Cookie: cookies().toString(),
					Accept: 'application/json',
					'X-CSRFToken': csrfToken,
					Referer: process.env.NEXT_PUBLIC_REFERER || '',
				},
				credentials: 'include',
			}
		);

		const resCookies = refreshRes.headers.getSetCookie();
		let accessToken = '';
		for (const c of resCookies) {
			const parsedCookie = cookie.parse(c);

			if (ACCESS in parsedCookie) {
				accessToken = parsedCookie.access;
			}
		}

		const updatedCookies = [
			`${ACCESS}=${accessToken}`,
			`${CSRF_TOKEN}=${csrfToken}`,
		].join('; ');

		response = await fetch(url, {
			...options,
			headers: {
				...options.headers,
				Cookie: updatedCookies,
			},
		});
	}

	return response;
}
