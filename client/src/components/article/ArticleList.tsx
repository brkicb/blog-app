import { PaginatedList } from '@/components/admin/list';
import { ArticleContentBox } from '@/components/article';
import paths from '@/utils/paths';
import type { BlogResponse } from '@/types/blog';

interface Props {
	currentPage: number;
	fetchData: () => Promise<BlogResponse>;
}

export default async function ArticleList({ currentPage, fetchData }: Props) {
	const posts = await fetchData();

	return (
		<PaginatedList
			path={paths.blogPosts()}
			currentPage={currentPage}
			data={posts}
		>
			{posts.results.length > 0 ? (
				<div className='space-y-2.4 lg:space-y-4.8'>
					{posts.results.map(post => (
						<ArticleContentBox
							key={`blog-article-box-${post.id}`}
							baseUrl='/blog'
							post={post}
						/>
					))}
				</div>
			) : (
				<div className='text-center mt-20'>
					<p className='text-lg font-light italic'>
						No blog posts posted yet
					</p>
				</div>
			)}
		</PaginatedList>
	);
}
