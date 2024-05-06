import Link from 'next/link';
import Image from 'next/image';
import cn from 'classnames';

interface Props {
	wSm?: boolean;
	wMd?: boolean;
	wLg?: boolean;
	wAuto?: boolean;
	hSm?: boolean;
	hMd?: boolean;
	hLg?: boolean;
	link?: boolean;
	center?: boolean;
}

export default function Logo({
	wSm,
	wMd,
	wLg,
	wAuto,
	hSm,
	hMd,
	hLg,
	link,
	center,
}: Props) {
	const className = cn('relative block', {
		'w-2': wSm,
		'w-4': wMd,
		'w-6': wLg,
		'w-auto': wAuto,
		'h-2': hSm,
		'h-4': hMd,
		'h-6': hLg,
		'mx-auto': center,
	});

	const image = (
		<Image
			className='object-contain'
			src='/images/logo.png'
			alt='logo'
			fill
			sizes='720px'
		/>
	);

	if (link) {
		return (
			<Link className={className} href='/'>
				{image}
			</Link>
		);
	}

	return <div className={className}>{image}</div>;
}
