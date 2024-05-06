import { Breadcrumb } from '@/components/common';
import { SimpleHeaderSection } from '@/components/sections';
import { ArticleList } from '@/components/article';
import type { BlogResponse } from '@/types/blog';

interface Props {
	searchParams: {
		page: string | undefined;
	};
}

async function getData(page: number): Promise<BlogResponse> {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_HOST}/api/blog/posts/?ordering=-date_created&page=${page}`
	);

	if (!res.ok) {
		throw new Error('Failed to fetch blog posts');
	}

	return res.json();
}

export default async function Page({ searchParams }: Props) {
	const { page } = searchParams;
	const currentPage = page ? Number(page) : 1;

	return (
		<main>
			<SimpleHeaderSection heading='Our Blog' />
			<div className='px-2.4 md:px-4.5 xl:px-0 w-full max-w-112 mx-auto'>
				<div className='pt-4 pb-1.6'>
					<Breadcrumb
						pages={[
							{
								name: 'Home',
								href: '/',
								current: false,
								first: true,
							},
							{
								name: 'Blog',
								current: true,
							},
						]}
					/>
				</div>
				<hr className='border-color-outline' />
				<ArticleList
					currentPage={currentPage}
					fetchData={() => getData(currentPage)}
				/>
			</div>
		</main>
	);
}
