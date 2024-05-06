import { Author } from '@/types/author';

export interface BlogPost {
	id: number;
	author: Author;
	thumbnail: string;
	title: string;
	slug: string;
	excerpt: string;
	thumbnail_alt: string;
	content: string;
	is_published: boolean;
	date_created: string;
	date_updated: string;
}

export interface BlogResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: BlogPost[];
}
