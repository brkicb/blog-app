import { Suspense } from 'react';
import { AdminButton, Breadcrumb } from '@/components/admin';
import { Spinner } from '@/components/common';
import { Heading } from '@/components/typography';
import { AdminBlogList } from '@/components/admin/list';
import paths from '@/utils/paths';

export default function Page() {
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
						current: true,
						first: false,
					},
				]}
			/>
			<div className='py-4'>
				<Heading tertiary fontLight>
					Manage Blog Posts
				</Heading>
			</div>
			<div className='flex gap-2 pb-4'>
				<AdminButton href={paths.adminBlogPostCreate()} createBtn>
					Create Blog Post
				</AdminButton>
				<AdminButton href={paths.adminAuthors()} navBtn>
					Manage Blog Authors
				</AdminButton>
			</div>
			<Suspense fallback={<Spinner sm />}>
				<AdminBlogList />
			</Suspense>
		</div>
	);
}
