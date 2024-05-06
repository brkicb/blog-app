import Link from 'next/link';
import cn from 'classnames';

interface Props {
	active?: boolean;
	href: string;
	children: React.ReactNode;
}

export default function PaginationButton({ active, href, children }: Props) {
	const className = cn(
		'relative w-5.2 h-5.2 flex justify-center items-center text-titleText leading-titleText',
		{
			'bg-color-primary text-color-onPrimary hover:bg-color-primaryHover':
				active,
			'bg-color-secondary text-color-onSecondary hover:bg-color-secondaryHover':
				!active,
		}
	);

	return (
		<Link className={className} href={href} aria-current='page'>
			{children}
		</Link>
	);
}
