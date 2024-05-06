import Link from 'next/link';
import { HiChevronRight } from 'react-icons/hi2';
import cn from 'classnames';

interface Page {
	name: string;
	href?: string;
	current: boolean;
	first?: boolean;
}

interface Props {
	pages: Page[];
}

export default function Breadcrumb({ pages }: Props) {
	const className = (page: Page) =>
		cn('text-baseText', {
			'text-color-baseText hover:text-color-primary': !page.current,
			'text-color-primary': page.current,
		});

	return (
		<nav className='flex' aria-label='Breadcrumb'>
			<ol role='list' className='flex items-center gap-0.4'>
				{pages.map(page => (
					<li key={`breadcrumb-${page.name}`}>
						<div className='flex items-center'>
							{!page.first && (
								<HiChevronRight
									className='h-1.6 w-1.6 flex-shrink-0 text-color-baseText'
									aria-hidden='true'
								/>
							)}

							{page.href ? (
								<Link
									className={className(page)}
									href={page.href}
									aria-current={
										page.current ? 'page' : undefined
									}
								>
									{page.name}
								</Link>
							) : (
								<p
									className={className(page)}
									aria-current={
										page.current ? 'page' : undefined
									}
								>
									{page.name}
								</p>
							)}
						</div>
					</li>
				))}
			</ol>
		</nav>
	);
}
