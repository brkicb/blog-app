'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { AdminButton } from '@/components/admin';
import { PaginatedList } from '@/components/admin/list';
import { fetchAuthorList } from '@/lib/queries/authors';
import { fetchBlogPosts } from '@/lib/queries/blog';
import { ArticleContentBox } from '@/components/article';
import paths from '@/utils/paths';
import type { Author } from '@/types/author';
import type { BlogResponse, BlogPost } from '@/types/blog';
import { Paragraph } from '@/components/typography';

export default function AdminBlogList() {
	const searchParams = useSearchParams();
	const page = searchParams.get('page');
	const currentPage = page ? Number(page) : 1;

	const [authors, setAuthors] = useState<Author[]>([]);
	const [posts, setPosts] = useState<BlogResponse>({
		results: [],
		count: 0,
		previous: null,
		next: null,
	});

	useEffect(() => {
		const fetchAuthors = async () => {
			const data = await fetchAuthorList();
			setAuthors(data);
		};

		const fetchArticles = async () => {
			const data = await fetchBlogPosts(currentPage);
			setPosts(data);
		};

		fetchAuthors();
		fetchArticles();
	}, [currentPage]);

	return (
		<>
			{authors.length > 0 ? (
				<PaginatedList
					path={paths.adminBlogPosts()}
					currentPage={currentPage}
					data={posts}
					full
					gapSm
					hideTopPagination
				>
					<div className='space-y-2.4'>
						{posts.results.map((post: BlogPost) => (
							<ArticleContentBox
								key={`admin-blog-list-${post.id}`}
								baseUrl={paths.adminBlogPosts()}
								post={post}
							/>
						))}
					</div>
				</PaginatedList>
			) : (
				<div className='flex flex-col justify-center items-center gap-2 mt-4'>
					<Paragraph title fontLight>
						Must create an author to make blog posts
					</Paragraph>
					<AdminButton href={paths.adminAuthorCreate()} createBtn>
						Create Author
					</AdminButton>
				</div>
			)}
		</>
	);
}
