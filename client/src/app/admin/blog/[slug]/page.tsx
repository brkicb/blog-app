'use client';

import { useState, useEffect } from 'react';
import { Spinner } from '@/components/common';
import { Heading } from '@/components/typography';
import { AdminButton, Breadcrumb } from '@/components/admin';
import { UpdateBlogPostForm } from '@/components/admin/forms';
import { fetchBlogPost } from '@/lib/queries/blog';
import paths from '@/utils/paths';
import type { BlogPost } from '@/types/blog';

interface Props {
	params: {
		slug: string;
	};
}

export default function Page({ params: { slug } }: Props) {
	const [post, setPost] = useState<BlogPost | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetchBlogPost(slug);
			setPost(data);
		};

		fetchData();
	}, [slug]);

	return (
		<div>
			<Breadcrumb
				pages={[
					{
						name: 'Dashboard',
						href: paths.admin(),
						current: false,
						first: true,
					},
					{
						name: 'Blog',
						href: paths.adminBlogPosts(),
						current: false,
						first: false,
					},
					{
						name: post?.title || 'Current Post',
						current: true,
						first: false,
					},
				]}
			/>
			<div className='flex justify-between items-start py-4'>
				<Heading tertiary fontLight>
					Update Blog Post
				</Heading>
				<AdminButton href={paths.adminBlogPostDelete(slug)} deleteBtn>
					Delete Post
				</AdminButton>
			</div>

			{!post ? (
				<div className='flex justify-center my-8'>
					<Spinner lg />
				</div>
			) : (
				<UpdateBlogPostForm post={post} />
			)}
		</div>
	);
}
