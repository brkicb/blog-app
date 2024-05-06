'use client';

import { usePathname } from 'next/navigation';
import { Disclosure } from '@headlessui/react';
import { HiOutlineBars3, HiXMark, HiPhone } from 'react-icons/hi2';
import { NavLink, Logo } from '@/components/common';
import paths from '@/utils/paths';

export default function Navbar() {
	const pathname = usePathname();

	const isSelected = (path: string) => (pathname === path ? true : false);

	const renderLinks = (
		<>
			<NavLink
				isSelected={isSelected(paths.home())}
				isMobile={false}
				href={paths.home()}
			>
				Home
			</NavLink>
			<NavLink
				isSelected={isSelected(paths.blogPosts())}
				isMobile={false}
				href={paths.blogPosts()}
			>
				Blog
			</NavLink>
		</>
	);

	const renderMobileLinks = (
		<div className='space-y-1'>
			<NavLink
				isSelected={isSelected(paths.home())}
				isMobile={true}
				href={paths.home()}
			>
				Home
			</NavLink>
			<hr className='w-full border-color-outline' />
			<NavLink
				isSelected={isSelected(paths.blogPosts())}
				isMobile={true}
				href={paths.blogPosts()}
			>
				Blog
			</NavLink>
		</div>
	);

	return (
		<Disclosure as='nav' className='bg-color-surface'>
			{({ open }) => (
				<>
					<div className='mx-auto max-w-144 px-2.4 sm:px-4.5 lg:px-2 h-8.8'>
						<div className='relative flex h-full items-center justify-between'>
							<div className='flex flex-1 items-center justify-between sm:items-stretch'>
								<Logo wMd hMd link />
								<div className='flex gap-2.4 xl:gap-6'>
									<div className='hidden xl:flex xl:justify-between xl:items-center xl:gap-6'>
										{renderLinks}
									</div>
									<Disclosure.Button className='flex xl:hidden items-center justify-center text-color-baseText hover:text-color-textBaseHover focus:outline-none'>
										<span className='absolute -inset-0.5' />
										<span className='sr-only'>
											Open main menu
										</span>
										{open ? (
											<HiXMark
												className='block h-4 w-4'
												aria-hidden='true'
											/>
										) : (
											<HiOutlineBars3
												className='block h-4 w-4'
												aria-hidden='true'
											/>
										)}
									</Disclosure.Button>
								</div>
							</div>
						</div>
					</div>

					<Disclosure.Panel className='block xl:hidden'>
						<div className='space-y-0.2 p-2.4'>
							{renderMobileLinks}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}
