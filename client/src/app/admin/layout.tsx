'use client';

import { usePathname } from 'next/navigation';
import cn from 'classnames';
import { Sidebar } from '@/components/admin';
import { HiHome, HiMiniPencilSquare, HiFolder } from 'react-icons/hi2';
import paths from '@/utils/paths';
import type { Navigation } from '@/types/admin';

interface Props {
	children: React.ReactNode;
}

export default function Layout({ children }: Props) {
	const pathname = usePathname();

	const isCurrent = (path: string) => {
		if (path === paths.admin()) {
			return path === pathname;
		}
		const regex = new RegExp(`^${path}(/|$)`);

		return regex.test(pathname);
	};

	const navigation: Navigation[] = [
		{
			name: 'Dashboard',
			href: paths.admin(),
			icon: HiHome,
			current: isCurrent(paths.admin()),
		},
		{
			name: 'Blog Authors',
			href: paths.adminAuthors(),
			icon: HiMiniPencilSquare,
			current: isCurrent(paths.adminAuthors()),
		},
		{
			name: 'Blog',
			href: paths.adminBlogPosts(),
			icon: HiFolder,
			current: isCurrent(paths.adminBlogPosts()),
		},
	];

	return (
		<div>
			<Sidebar navigation={navigation} />

			<main
				className={cn('px-8 py-12', {
					'ml-35': pathname !== paths.adminLogin(),
				})}
			>
				{children}
			</main>
		</div>
	);
}
