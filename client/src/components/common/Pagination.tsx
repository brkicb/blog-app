'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MobileButton, PaginationButton } from '@/components/utils';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import cn from 'classnames';

interface Props {
	itemsPerPage: number;
	count: number;
	countOnPage: number;
	currentPage: number;
	href: string;
	previous: string;
	next: string;
	themeLight?: boolean;
}

export default function Pagination({
	itemsPerPage,
	count,
	countOnPage,
	currentPage,
	href,
	previous,
	next,
	themeLight,
}: Props) {
	const ITEMS_PER_PAGE = Number(itemsPerPage);

	const [firstItem, setFirstItem] = useState(1);
	const [lastItem, setLastItem] = useState(countOnPage);

	useEffect(() => {
		const positionOfLastItem =
			currentPage * ITEMS_PER_PAGE < count
				? currentPage * ITEMS_PER_PAGE
				: count;
		const positionOfFirstItem =
			count > 0 ? positionOfLastItem - countOnPage + 1 : 0;

		setFirstItem(positionOfFirstItem);
		setLastItem(positionOfLastItem);
	}, [currentPage, countOnPage, count, ITEMS_PER_PAGE]);

	const renderButtons = () => {
		const items = [];

		for (
			let i = 0, pageNumber = 1;
			i < count;
			i += itemsPerPage, pageNumber++
		) {
			items.push(
				<PaginationButton
					key={`${href}-${i}`}
					href={`${href}?page=${pageNumber}`}
					active={currentPage === pageNumber}
				>
					{pageNumber}
				</PaginationButton>
			);
		}

		return items;
	};

	return (
		<div className='flex items-center justify-between'>
			<div className='flex flex-1 justify-between sm:hidden'>
				<MobileButton href={previous}>Previous</MobileButton>
				<MobileButton href={next} className='ml-3'>
					Next
				</MobileButton>
			</div>
			<div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
				<div>
					<p
						className={cn(
							'text-baseText leading-baseText font-bold',
							{
								'text-color-baseText': !themeLight,
								'text-color-surface': themeLight,
							}
						)}
					>
						Showing {firstItem} to {lastItem} of {count} results
					</p>
				</div>
				<div>
					<nav className='flex gap-0.2' aria-label='Pagination'>
						<Link
							className='relative w-5.2 height-5.2 inline-flex justify-center items-center rounded-l-full text-color-onPrimaryContainer bg-color-primaryContainer hover:bg-color-primaryContainerHover'
							href={previous}
						>
							<span className='sr-only'>Previous</span>
							<HiChevronLeft
								className='h-2.4 w-2.4'
								aria-hidden='true'
							/>
						</Link>
						{renderButtons()}
						<Link
							className='relative w-5.2 height-5.2 inline-flex justify-center items-center rounded-r-full text-color-onPrimaryContainer bg-color-primaryContainer hover:bg-color-primaryContainerHover'
							href={next}
						>
							<span className='sr-only'>Next</span>
							<HiChevronRight
								className='h-2.4 w-2.4'
								aria-hidden='true'
							/>
						</Link>
					</nav>
				</div>
			</div>
		</div>
	);
}
