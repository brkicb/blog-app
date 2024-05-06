import { notFound } from 'next/navigation';
import { ContentWrapper } from '@/components/layout';
import { Breadcrumb } from '@/components/common';
import { SimpleHeaderSection } from '@/components/sections';
import { formatDate } from '@/utils/format-date';
import type { BlogPost } from '@/types/blog';

interface Props {
	params: {
		slug: string;
	};
}

async function getData(slug: string): Promise<BlogPost> {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_HOST}/api/blog/posts/${slug}/`
	);

	if (res.status === 404) {
		return notFound();
	}

	if (!res.ok) {
		throw new Error('Failed to fetch blog posts');
	}

	return res.json();
}

export default async function Page({ params: { slug } }: Props) {
	const post = await getData(slug);

	if (!post) notFound();

	return (
		<main>
			<SimpleHeaderSection heading={post.title} />
			<div className='w-full max-w-112 mx-auto pt-4 pb-1.6'>
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
							href: '/blog',
							current: false,
						},
						{
							name: post.title,
							current: true,
						},
					]}
				/>
			</div>
			<hr className='w-full max-w-112 mx-auto border-color-outline' />
			<div className='w-full max-w-112 mx-auto pt-8 pb-12'>
				<div className='bg-color-inverseSurface p-2.4 rounded-lg'>
					<div className='bg-color-surface p-2.4 space-y-2.4 rounded-lg'>
						<div className='space-y-1.2'>
							<p className='text-smallText leading-smallText text-color-variantOutline'>
								{formatDate(post.date_created)} |{' '}
								{post.author.name}
							</p>
							<hr className='w-full border-color-outline' />
						</div>

						<ContentWrapper data={post.content} />
					</div>
				</div>
			</div>
		</main>
	);
}
