'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { serverFetch } from '@/utils/server-fetch';
import paths from '@/utils/paths';
import { CSRF_TOKEN } from '@/utils/constants';

interface ValidationError {
	name?: string[] | undefined;
	title?: string[] | undefined;
	thumbnail?: string[] | undefined;
}

interface FormState {
	errors: ValidationError & {
		_form?: string[] | undefined;
	};
}

const MAX_FILE_SIZE = 10000000;
const ACCEPTED_IMAGE_TYPES = [
	'image/jpeg',
	'image/jpg',
	'image/png',
	'image/webp',
];

const schema = z.object({
	name: z
		.string({
			invalid_type_error: 'Please provide a valid full name',
		})
		.min(1)
		.max(255)
		.refine(
			value => {
				const parts = value.split(' ');

				return (
					parts.length >= 2 && parts.every(part => part.length > 0)
				);
			},
			{
				message: 'Full name must include a first name and a last name',
			}
		),
	title: z
		.string({
			invalid_type_error: 'Please provide a valid title',
		})
		.min(1)
		.max(255),
	thumbnail: z
		.any()
		.refine(file => file?.size <= MAX_FILE_SIZE, `Max image size is 10MB.`)
		.refine(
			file => ACCEPTED_IMAGE_TYPES.includes(file?.type),
			'Only .jpg, .jpeg, .png and .webp formats are supported.'
		),
});

export async function authorsCreate(
	formState: FormState,
	formData: FormData
): Promise<FormState> {
	const rawFormData = {
		name: formData.get('name'),
		title: formData.get('title'),
		thumbnail: formData.get('thumbnail'),
	};

	const validatedFields = schema.safeParse(rawFormData);

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	try {
		const allCookies = cookies().toString();
		const csrfToken = cookies().get(CSRF_TOKEN)?.value;

		if (!csrfToken) {
			return {
				errors: {
					_form: ['Failed to create author'],
				},
			};
		}

		const res = await serverFetch(
			`${process.env.NEXT_PUBLIC_HOST}/admin/blog/author/`,
			{
				method: 'POST',
				headers: {
					Cookie: allCookies,
					Accept: 'application/json',
					'X-CSRFToken': csrfToken || '',
					Referer: process.env.NEXT_PUBLIC_REFERER || '',
				},
				body: formData,
			}
		);

		if (res.status === 400) {
			const data: ValidationError = await res.json();

			return {
				errors: data,
			};
		}

		if (res.status !== 201) {
			return {
				errors: {
					_form: ['Failed to create author'],
				},
			};
		}
	} catch (err) {
		if (err instanceof Error) {
			return {
				errors: {
					_form: [err.message],
				},
			};
		} else {
			return {
				errors: {
					_form: ['Something went wrong when creating author'],
				},
			};
		}
	}

	redirect(paths.adminAuthors());
}
