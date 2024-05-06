'use client';

import Link from 'next/link';
import { Disclosure } from '@headlessui/react';
import cn from 'classnames';

interface Props {
	isSelected?: boolean;
	isMobile?: boolean;
	href?: string;
	children: React.ReactNode;
	[rest: string]: any;
}

export default function NavLink({
	isSelected,
	isMobile,
	href,
	children,
	...rest
}: Props) {
	const className = cn(rest.className, 'font-base', {
		'text-color-baseText hover:text-color-primary': !isSelected,
		'block text-baseText': isMobile,
		'text-color-baseText': isMobile && !isSelected,
		'text-baseText': !isMobile,
		'text-color-primary hover:text-color-baseText': isSelected,
	});

	if (!href) {
		return (
			<span className={className} role='button' onClick={rest.onClick}>
				{children}
			</span>
		);
	}

	if (isMobile) {
		return (
			<Disclosure.Button className={className} as='a' href={href}>
				{children}
			</Disclosure.Button>
		);
	}

	return (
		<Link className={className} href={href}>
			{children}
		</Link>
	);
}
