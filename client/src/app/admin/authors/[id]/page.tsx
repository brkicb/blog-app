'use client';

import { useState, useEffect } from 'react';
import { Spinner } from '@/components/common';
import { Heading } from '@/components/typography';
import { AdminButton, Breadcrumb } from '@/components/admin';
import { UpdateAuthorForm } from '@/components/admin/forms';
import { fetchAuthor } from '@/lib/queries/authors';
import paths from '@/utils/paths';
import type { Author } from '@/types/author';

interface Props {
	params: {
		id: string;
	};
}

export default function Page({ params: { id } }: Props) {
	const [author, setAuthor] = useState<Author | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetchAuthor(id);
			setAuthor(data);
		};

		fetchData();
	}, [id]);

	return (
		<div>
			<Breadcrumb
				pages={[
					{
						name: 'Dashboard',
						href: '/admin',
						current: false,
						first: true,
					},
					{
						name: 'Authors',
						href: paths.adminAuthors(),
						current: false,
						first: false,
					},
					{
						name: author?.name || 'Current Author',
						current: true,
						first: false,
					},
				]}
			/>
			<div className='flex justify-between items-center py-4'>
				<Heading tertiary fontLight>
					Update Author
				</Heading>
				<AdminButton href={paths.adminAuthorDelete(id)} deleteBtn>
					Delete Author
				</AdminButton>
			</div>

			{!author ? (
				<div className='flex justify-center my-8'>
					<Spinner lg />
				</div>
			) : (
				<UpdateAuthorForm author={author} />
			)}
		</div>
	);
}
