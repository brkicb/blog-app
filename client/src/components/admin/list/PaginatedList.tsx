import cn from 'classnames';
import { Pagination } from '@/components/common';

interface Props {
	path: string;
	currentPage: number;
	data: {
		count: number;
		next: string | null;
		previous: string | null;
		results: any[];
	};
	children: React.ReactNode;
	full?: boolean;
	gapSm?: boolean;
	hideTopPagination?: boolean;
	themeLight?: boolean;
}

export default function PaginatedList({
	path,
	currentPage,
	data,
	children,
	full,
	gapSm,
	hideTopPagination,
	themeLight,
}: Props) {
	const POSTS_PER_PAGE = Number(process.env.NEXT_PUBLIC_PAGE_SIZE);

	const countPostsOnPage = data.results.length;

	const previousPage = () => {
		if (currentPage !== 1) {
			const prevPage = currentPage - 1;

			return `${path}?page=${prevPage}`;
		}

		return `${path}?page=${currentPage}`;
	};

	const nextPage = () => {
		if (currentPage !== Math.ceil(data.count / POSTS_PER_PAGE)) {
			const nextPage = currentPage + 1;

			return `${path}?page=${nextPage}`;
		}

		return `${path}?page=${currentPage}`;
	};

	return (
		<section
			className={cn('w-full', {
				'max-w-112 mx-auto': !full,
			})}
		>
			{!hideTopPagination && data.count > POSTS_PER_PAGE && (
				<section
					className={cn('', {
						'py-8': !gapSm,
						'py-4': gapSm,
					})}
				>
					<Pagination
						itemsPerPage={POSTS_PER_PAGE}
						count={data.count}
						countOnPage={countPostsOnPage}
						currentPage={currentPage}
						href={path}
						previous={previousPage()}
						next={nextPage()}
						themeLight
					/>
				</section>
			)}
			<div
				className={cn('', {
					'py-4': !gapSm,
				})}
			>
				{children}
			</div>
			{data.count > POSTS_PER_PAGE && (
				<section
					className={cn('', {
						'py-8': !gapSm,
						'py-4': gapSm,
					})}
				>
					<Pagination
						itemsPerPage={POSTS_PER_PAGE}
						count={data.count}
						countOnPage={countPostsOnPage}
						currentPage={currentPage}
						href={path}
						previous={previousPage()}
						next={nextPage()}
						themeLight
					/>
				</section>
			)}
		</section>
	);
}
