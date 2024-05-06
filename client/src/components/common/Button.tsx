import Link from 'next/link';
import cn from 'classnames';

interface Props {
	primary?: boolean;
	secondary?: boolean;
	wrapped?: boolean;
	wrappedLeft?: boolean;
	lg?: boolean;
	href: string;
	children: React.ReactNode;
}

export default function Button({
	primary,
	secondary,
	wrapped,
	wrappedLeft,
	lg,
	href,
	children,
}: Props) {
	const className = cn(
		'flex justify-center items-center text-baseText rounded-md shadow-md px-2 py-0.6',
		{
			'bg-color-primary hover:bg-color-primaryHover text-color-onPrimary':
				primary,
			'bg-color-secondary hover:bg-color-secondaryHover text-color-onSecondary':
				secondary,
			'text-titleText px-2.4 py-1.2': lg,
		}
	);

	const wrappedClassName = cn('flex items-center', {
		'justify-center': !wrappedLeft,
	});

	const button = (
		<Link className={className} href={href}>
			{children}
		</Link>
	);

	if (wrapped) {
		return <div className={wrappedClassName}>{button}</div>;
	}

	return button;
}
