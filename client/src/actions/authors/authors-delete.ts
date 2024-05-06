'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { serverFetch } from '@/utils/server-fetch';
import paths from '@/utils/paths';
import { CSRF_TOKEN } from '@/utils/constants';

interface FormState {
	errors: {
		_form?: string[] | undefined;
	};
}

export async function authorsDelete(
	id: string,
	formState: FormState
): Promise<FormState> {
	const allCookies = cookies().toString();
	const csrfToken = cookies().get(CSRF_TOKEN)?.value;

	if (!csrfToken) {
		return {
			errors: {
				_form: ['Failed to delete author'],
			},
		};
	}

	try {
		const res = await serverFetch(
			`${process.env.NEXT_PUBLIC_HOST}/admin/blog/author/${id}/`,
			{
				method: 'DELETE',
				headers: {
					Cookie: allCookies,
					Accept: 'application/json',
					'X-CSRFToken': csrfToken || '',
					Referer: process.env.NEXT_PUBLIC_REFERER || '',
				},
			}
		);

		if (res.status !== 204) {
			return {
				errors: {
					_form: ['Failed to delete author'],
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
					_form: ['Failed to delete author'],
				},
			};
		}
	}

	redirect(paths.adminAuthors());
}
