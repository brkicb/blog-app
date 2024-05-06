'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import cn from 'classnames';
import { HiCog6Tooth } from 'react-icons/hi2';
import paths from '@/utils/paths';
import { Logo } from '@/components/common';
import type { Navigation } from '@/types/admin';

interface Props {
	navigation: Navigation[];
}

export default function Sidebar({ navigation }: Props) {
	const pathname = usePathname();

	if (pathname === paths.adminLogin()) {
		return null;
	}

	return (
		<div className='hidden relative lg:fixed lg:inset-y-0 lg:flex lg:h-100 lg:z-50 lg:w-35 lg:flex-col'>
			<div className='flex grow flex-col gap-y-2 overflow-y-auto bg-color-inverseSurface px-1.5 pb-1'>
				<div className='flex justify-center items-center mt-2 mb-1.5'>
					<Logo wMd hMd />
				</div>
				<nav>
					<ul role='list' className='space-y-1'>
						{navigation.map(item => (
							<li key={`sidebar-${item.name}`}>
								<Link
									href={item.href}
									className={cn(
										'group flex items-center gap-x-1.5 rounded-md px-1 py-0.5 text-baseText leading-baseText font-bold',
										{
											'bg-color-primary text-color-onPrimary':
												item.current,
											'text-color-outlineVariant hover:text-color-onPrimary hover:bg-color-primary':
												!item.current,
										}
									)}
								>
									<item.icon
										className='h-2.2 w-2.2 shrink-0'
										aria-hidden='true'
									/>
									{item.name}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>
			<ul role='list' className='absolute bottom-1 w-full px-1.5'>
				<li>
					<Link
						href='/admin/settings'
						className='group flex items-center gap-x-1.5 rounded-md px-1 py-0.5 text-baseText font-bold leading-baseText text-color-outlineVariant hover:bg-color-primary hover:text-color-onPrimary'
					>
						<HiCog6Tooth
							className='h-2.2 w-2.2 shrink-0'
							aria-hidden='true'
						/>
						Settings
					</Link>
				</li>
			</ul>
		</div>
	);
}
