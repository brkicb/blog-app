'use client';

import Link from 'next/link';
import { useAdminSession } from '@/hooks';
import { Spinner } from '@/components/common';
import { Heading } from '@/components/typography';
import { HiMiniPencilSquare, HiFolder } from 'react-icons/hi2';
import paths from '@/utils/paths';

export default function Page() {
	const { status, session } = useAdminSession();
	const user = session.user;

	if (status === 'loading') {
		return (
			<div className='flex justify-center my-8'>
				<Spinner lg />
			</div>
		);
	}

	return (
		<div className='h-screen'>
			<Heading tertiary fontLight>
				Welcome {user?.first_name} {user?.last_name}
			</Heading>
			<div className='grid grid-cols-4 gap-2.4 pt-8'>
				<Link
					className='flex items-center gap-x-1 bg-color-secondaryContainer rounded shadow p-2.4 hover:bg-color-secondaryContainerHover'
					href={paths.adminAuthors()}
				>
					<HiMiniPencilSquare className='text-color-onSecondaryContainer w-4 h-4' />
					<span className='text-baseText leading-baseText text-color-onSecondaryContainer'>
						Blog Authors
					</span>
				</Link>
				<Link
					className='flex items-center gap-x-1 bg-color-secondaryContainer rounded shadow p-2.4 hover:bg-color-secondaryContainerHover'
					href={paths.adminBlogPosts()}
				>
					<HiFolder className='text-color-onSecondaryContainer w-4 h-4' />
					<span className='text-baseText leading-baseText text-color-onSecondaryContainer'>
						Blog
					</span>
				</Link>
			</div>
		</div>
	);
}
