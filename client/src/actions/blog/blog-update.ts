'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { serverFetch } from '@/utils/server-fetch';
import paths from '@/utils/paths';
import { CSRF_TOKEN } from '@/utils/constants';

const MAX_FILE_SIZE = 10000000;
const ACCEPTED_IMAGE_TYPES = [
	'image/jpeg',
	'image/jpg',
	'image/png',
	'image/webp',
];

interface ValidationError {
	title?: string[] | undefined;
	slug?: string[] | undefined;
	excerpt?: string[] | undefined;
	thumbnail?: string[] | undefined;
	thumbnail_alt?: string[] | undefined;
	author?: string[] | undefined;
	content?: string[] | undefined;
	is_published?: string[] | undefined;
}

interface FormState {
	errors: ValidationError & {
		_form?: string[] | undefined;
	};
}

const schema = z.object({
	title: z
		.string({
			invalid_type_error: 'Please provide a valid title',
		})
		.min(1)
		.max(255),
	slug: z
		.string({
			invalid_type_error: 'Please provide a valid slug',
		})
		.min(1)
		.max(255)
		.regex(/^[0-9a-z-]+$/, {
			message:
				'Slug should use only lowercase letters, numbers or dashes without spaces',
		}),
	excerpt: z
		.string({
			invalid_type_error: 'Please provide a valid excerpt',
		})
		.min(1)
		.max(400),
	thumbnail_alt: z
		.string({
			invalid_type_error: 'Please provide valid thumbnail alt text',
		})
		.min(1)
		.max(50),
	author: z.number({
		invalid_type_error: 'Please provide a valid author id',
	}),
	content: z
		.string({
			invalid_type_error: 'Please provide valid blog content',
		})
		.min(1),
	is_published: z.boolean(),
});

const thumbnailSchema = z.object({
	thumbnail: z
		.any()
		.refine(file => file?.size <= MAX_FILE_SIZE, `Max image size is 10MB.`)
		.refine(
			file => ACCEPTED_IMAGE_TYPES.includes(file?.type),
			'Only .jpg, .jpeg, .png and .webp formats are supported.'
		),
});

export async function blogUpdate(
	slug: string,
	content: string,
	is_published: boolean,
	formState: FormState,
	formData: FormData
): Promise<FormState> {
	formData.append('content', content);

	if (formData.has('is_published')) {
		formData.set('is_published', is_published.toString());
	} else {
		formData.append('is_published', is_published.toString());
	}

	const rawFormData: {
		[key: string]: FormDataEntryValue | boolean | number | null;
	} = {
		title: formData.get('title'),
		slug: formData.get('slug'),
		excerpt: formData.get('excerpt'),
		thumbnail_alt: formData.get('thumbnail_alt'),
		content: formData.get('content'),
		is_published: is_published,
	};

	if (formData.has('author')) {
		rawFormData.author = Number(formData.get('author'));
	}

	const thumbnail = formData.get('thumbnail') as File;

	if (thumbnail?.name === 'undefined') {
		formData.delete('thumbnail');
	}

	const validatedFields = schema.safeParse(rawFormData);

	let allErrors: ValidationError = {};

	if (!validatedFields.success) {
		allErrors = {
			...validatedFields.error.flatten().fieldErrors,
		};
	}

	if (formData.has('thumbnail')) {
		const validatedThumbnail = thumbnailSchema.safeParse({
			thumbnail,
		});

		if (!validatedThumbnail.success) {
			allErrors = {
				...allErrors,
				...validatedThumbnail.error.flatten().fieldErrors,
			};
		}
	}

	if (Object.keys(allErrors).length > 0) {
		return {
			errors: allErrors,
		};
	}

	try {
		const allCookies = cookies().toString();
		const csrfToken = cookies().get(CSRF_TOKEN)?.value;

		if (!csrfToken) {
			return {
				errors: {
					_form: ['Failed to update blog post'],
				},
			};
		}

		const res = await serverFetch(
			`${process.env.NEXT_PUBLIC_HOST}/admin/blog/posts/${slug}/`,
			{
				method: 'PUT',
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

		if (res.status !== 200) {
			return {
				errors: {
					_form: ['Failed to update blog post'],
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
					_form: ['Something went wrong when updating blog post'],
				},
			};
		}
	}

	revalidatePath(paths.home());
	revalidatePath(paths.blogPosts());
	revalidatePath(paths.showBlogPost(slug));

	redirect(paths.adminBlogPosts());
}
