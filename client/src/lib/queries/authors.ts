import { clientFetch } from '@/utils/client-fetch';
import type { AuthorResponse, Author } from '@/types/author';

export const fetchAuthorList = async (): Promise<Author[]> => {
	try {
		const res = await clientFetch(
			`${process.env.NEXT_PUBLIC_HOST}/admin/blog/authors/`,
			{
				method: 'GET',
				credentials: 'include',
			}
		);

		if (res.status !== 200) {
			return [];
		}

		const data = await res.json();

		return data;
	} catch (err) {
		return [];
	}
};

export const fetchAuthors = async (
	currentPage: number
): Promise<AuthorResponse> => {
	try {
		const res = await clientFetch(
			`${process.env.NEXT_PUBLIC_HOST}/admin/blog/author/?ordering=-date_created&page=${currentPage}`,
			{
				method: 'GET',
				credentials: 'include',
			}
		);

		if (res.status !== 200) {
			return {
				results: [],
				count: 0,
				next: null,
				previous: null,
			};
		}

		const data = await res.json();

		return data;
	} catch (err) {
		return {
			results: [],
			count: 0,
			next: null,
			previous: null,
		};
	}
};

export const fetchAuthor = async (id: string): Promise<Author | null> => {
	try {
		const res = await clientFetch(
			`${process.env.NEXT_PUBLIC_HOST}/admin/blog/author/${id}/`,
			{
				method: 'GET',
				credentials: 'include',
			}
		);

		if (res.status !== 200) {
			return null;
		}

		const data: Author = await res.json();

		return data;
	} catch (err) {
		return null;
	}
};
