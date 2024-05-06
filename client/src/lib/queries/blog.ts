import { clientFetch } from '@/utils/client-fetch';
import type { BlogResponse, BlogPost } from '@/types/blog';

export const fetchBlogPosts = async (
	currentPage: number
): Promise<BlogResponse> => {
	try {
		const res = await clientFetch(
			`${process.env.NEXT_PUBLIC_HOST}/admin/blog/posts/?ordering=-date_created&page=${currentPage}`,
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

export const fetchBlogPost = async (slug: string): Promise<BlogPost | null> => {
	try {
		const res = await clientFetch(
			`${process.env.NEXT_PUBLIC_HOST}/admin/blog/posts/${slug}/`,
			{
				method: 'GET',
				credentials: 'include',
			}
		);

		if (res.status !== 200) {
			return null;
		}

		const data: BlogPost = await res.json();

		return data;
	} catch (err) {
		return null;
	}
};
