import Link from 'next/link';
import cn from 'classnames';

interface Props {
	href: string;
	wrapped?: boolean;
	sm?: boolean;
	children: React.ReactNode;
}

export default function CallToAction({ href, wrapped, sm, children }: Props) {
	const button = (
		<Link
			className={cn(
				'flex justify-center items-center font-bold bg-color-primary hover:bg-color-primaryHover text-color-onPrimary rounded-md shadow-md',
				{
					'text-titleText leading-titleText md:text-headingTertiary md:leading-headingTertiary lg:text-headingSecondary lg:leading-headingSecondary px-2.4 py-1.2':
						!sm,
					'text-baseText leading-baseText md:text-titleText md:leading-titleText lg:text-headingTertiary lg:leading-headingTertiary px-1.6 py-0.8':
						sm,
				}
			)}
			href={href}
		>
			{children}
		</Link>
	);

	if (wrapped) {
		return <div className='flex justify-center items-center'>{button}</div>;
	}

	return button;
}
