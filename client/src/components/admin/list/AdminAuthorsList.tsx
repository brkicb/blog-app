'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { PaginatedList } from '@/components/admin/list';
import { Paragraph } from '@/components/typography';
import { fetchAuthors } from '@/lib/queries/authors';
import paths from '@/utils/paths';
import { PiNotePencilFill } from 'react-icons/pi';
import type { AuthorResponse, Author } from '@/types/author';

export default function AdminAuthorList() {
	const searchParams = useSearchParams();
	const page = searchParams.get('page');
	const currentPage = page ? Number(page) : 1;

	const [authors, setAuthors] = useState<AuthorResponse>({
		results: [],
		count: 0,
		previous: null,
		next: null,
	});

	useEffect(() => {
		const fetchArticles = async () => {
			const data = await fetchAuthors(currentPage);
			setAuthors(data);
		};

		fetchArticles();
	}, [currentPage]);

	return (
		<PaginatedList
			path={paths.adminAuthors()}
			currentPage={currentPage}
			data={authors}
			full
			gapSm
			hideTopPagination
		>
			<div className='space-y-2'>
				{authors?.results.map((author: Author) => (
					<Link
						key={`admin-article-box-${author.id}`}
						className='flex flex-between items-center bg-color-secondaryContainer hover:bg-color-secondaryContainerHover px-2 py-1 rounded shadow'
						href={paths.adminAuthorUpdate(author.id.toString())}
					>
						<div className='relative flex items-center gap-x-2'>
							<Image
								className='rounded-full bg-color-inverseSurface'
								src={author.thumbnail}
								alt='profile'
								width={35}
								height={35}
							/>
							<div className='space-y-0.4'>
								<Paragraph base themeOnSecondaryContainer>
									<span className='absolute inset-0' />
									{author.name}
								</Paragraph>
								<Paragraph small themeOutline>
									{author.title}
								</Paragraph>
							</div>
						</div>
						<div className='ml-auto text-titleText text-color-onSecondaryContainer'>
							<PiNotePencilFill />
						</div>
					</Link>
				))}
			</div>
		</PaginatedList>
	);
}
