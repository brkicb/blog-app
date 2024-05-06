export interface Author {
	id: number;
	name: string;
	title: string;
	thumbnail: string;
	date_created: string;
	date_updated: string;
}

export interface AuthorResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: Author[];
}
