import cn from 'classnames';
import { ImSpinner3 } from 'react-icons/im';

interface Props {
	sm?: boolean;
	md?: boolean;
	lg?: boolean;
	marginTop?: boolean;
	center?: boolean;
	themeLight?: boolean;
}

export default function Spinner({
	sm,
	md,
	lg,
	marginTop,
	center,
	themeLight,
}: Props) {
	const wrapperClassName = cn('', {
		'mt-3': marginTop,
		'flex justify-center items-center': center,
	});

	const className = cn('animate-spin', {
		'w-2 h-2': sm,
		'w-4 h-4': md,
		'w-6 h-6': lg,
		'text-color-outlineVarient fill-color-outlineVarient': !themeLight,
		'texh-color-surface fill-color-surface': themeLight,
	});

	return (
		<div className={wrapperClassName} role='status'>
			<ImSpinner3 className={className} />
			<span className='sr-only'>Loading...</span>
		</div>
	);
}
