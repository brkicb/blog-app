'use server';

import { cookies } from 'next/headers';
import cookie from 'cookie';
import { redirect } from 'next/navigation';
import { z } from 'zod';
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

interface ValidationError {
	email?: string[] | undefined;
	password?: string[] | undefined;
}

interface FormState {
	errors: {
		email?: string[] | undefined;
		password?: string[] | undefined;
		_form?: string[] | undefined;
	};
}

const schema = z.object({
	email: z
		.string({
			invalid_type_error: 'Please provide a valid email',
		})
		.min(1, {
			message: 'Please provide a valid email',
		})
		.email('Please provide a valid email'),
	password: z
		.string({
			invalid_type_error:
				'Please provide a password with at least 8 characters',
		})
		.min(8, {
			message: 'Please provide a password with at least 8 characters',
		}),
});

export async function adminLogin(
	formState: FormState,
	formData: FormData
): Promise<FormState> {
	const rawFormData = {
		email: formData.get('email'),
		password: formData.get('password'),
	};

	const validatedFields = schema.safeParse(rawFormData);

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	try {
		const csrfCookie = cookies().toString();
		const csrfToken = cookies().get(CSRF_TOKEN)?.value;

		if (!csrfToken) {
			return {
				errors: {
					_form: ['Failed to log in'],
				},
			};
		}

		const res = await fetch(
			`${process.env.NEXT_PUBLIC_HOST}/admin/jwt/create/`,
			{
				method: 'POST',
				headers: {
					Cookie: csrfCookie,
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'X-CSRFToken': csrfToken || '',
					Referer: process.env.NEXT_PUBLIC_REFERER || '',
				},
				body: JSON.stringify(rawFormData),
			}
		);

		const resCookiesRaw = res.headers.getSetCookie();

		for (const c of resCookiesRaw) {
			const parsedCookie = cookie.parse(c);

			if (ACCESS in parsedCookie) {
				cookies().set({
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
				cookies().set({
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
			} else if (CSRF_TOKEN in parsedCookie) {
				cookies().set({
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

		if (res.status === 400) {
			const data: ValidationError = await res.json();

			return {
				errors: data,
			};
		} else if (res.status !== 200) {
			return {
				errors: {
					_form: ['Failed to log in'],
				},
			};
		}
	} catch (err: unknown) {
		if (err instanceof Error) {
			return {
				errors: {
					_form: [err.message],
				},
			};
		} else {
			return {
				errors: {
					_form: ['Something went wrong during login'],
				},
			};
		}
	}

	redirect(paths.admin());
}

export async function adminLogout() {
	cookies().delete(ACCESS);
	cookies().delete(REFRESH);

	redirect(paths.adminLogin());
}
