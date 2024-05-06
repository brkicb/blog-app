import { Suspense } from 'react';
import { AdminButton, Breadcrumb } from '@/components/admin';
import { AdminAuthorsList } from '@/components/admin/list';
import { Heading } from '@/components/typography';
import paths from '@/utils/paths';
import { Spinner } from '@/components/common';

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
						name: 'Authors',
						current: true,
						first: false,
					},
				]}
			/>
			<div className='flex justify-between items-center py-4'>
				<Heading tertiary fontLight>
					Manage Blog Authors
				</Heading>
				<AdminButton href={paths.adminAuthorCreate()} createBtn>
					Create Author
				</AdminButton>
			</div>
			<Suspense fallback={<Spinner sm />}>
				<AdminAuthorsList />
			</Suspense>
		</div>
	);
}
