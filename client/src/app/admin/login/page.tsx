import { Logo } from '@/components/common';
import { LoginForm } from '@/components/admin/forms';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: '[COMPANY] | Admin Login',
	description: 'Admin login for [COMPANY]',
};

export default function Page() {
	return (
		<div className='flex flex-col justify-center w-full max-w-40 py-12 mx-auto'>
			<div className='mx-auto w-full'>
				<Logo wAuto hMd />
				<h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
					Admin sign in
				</h2>
			</div>

			<div className='mt-10 mx-auto w-full'>
				<LoginForm />
			</div>
		</div>
	);
}
