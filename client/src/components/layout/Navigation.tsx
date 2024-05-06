'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/layout';

export default function Navigation() {
	const pathname = usePathname();

	const pathRegex = new RegExp(/^\/(admin)/);

	if (pathRegex.test(pathname)) {
		return <></>;
	}

	return <Navbar />;
}
