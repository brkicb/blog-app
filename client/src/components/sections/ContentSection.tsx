import cn from 'classnames';

interface Props {
	dark?: boolean;
	contentWidthLg?: boolean;
	children: React.ReactNode;
}

export default function ContentSection({
	dark,
	contentWidthLg,
	children,
}: Props) {
	const className = cn('w-full py-12 px-2.4 md:px-4.5 xl:px-0', {
		'bg-color-surface': !dark,
		'bg-color-inverseSurface': dark,
	});

	const contentClassName = cn('w-full max-w-112 mx-auto', {
		'max-w-135': contentWidthLg,
	});

	return (
		<section className={className}>
			<div className={contentClassName}>{children}</div>
		</section>
	);
}
