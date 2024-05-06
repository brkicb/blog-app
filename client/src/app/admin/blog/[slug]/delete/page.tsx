'use client';

import { useState, useEffect } from 'react';
import { useFormState } from 'react-dom';
import { AdminButton, Breadcrumb } from '@/components/admin';
import { Heading } from '@/components/typography';
import { FormButton, Validation } from '@/components/form';
import { fetchBlogPost } from '@/lib/queries/blog';
import paths from '@/utils/paths';
import * as actions from '@/actions';
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

	const [state, formAction] = useFormState(
		actions.blogDelete.bind(null, slug),
		{ errors: {} }
	);

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
						name: post?.title || 'Back To Post',
						href: paths.adminBlogPostUpdate(slug),
						current: false,
						first: false,
					},
					{
						name: 'Delete Post',
						current: true,
						first: false,
					},
				]}
			/>
			<div className='py-4'>
				<Heading tertiary fontLight>
					Are you sure you want to delete this blog post?
				</Heading>
			</div>
			<div className='flex gap-2'>
				<AdminButton href={paths.adminBlogPostUpdate(slug)}>
					No, Go Back
				</AdminButton>
				<form action={formAction}>
					<FormButton
						className='inline-block flex-none rounded-md bg-red-500 px-1.4 py-0.5 text-baseText leading-baseText text-white shadow-sm hover:bg-red-400'
						inline
					>
						Yes, Delete Post
					</FormButton>
				</form>
				{state.errors._form && (
					<Validation>{state.errors._form}</Validation>
				)}
			</div>
		</div>
	);
}
