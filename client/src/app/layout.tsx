import { Roboto } from 'next/font/google';
import { Navigation, ToastContainer } from '@/components/layout';
import type { Metadata } from 'next';

import '@/styles/globals.css';

const roboto = Roboto({
	weight: ['100', '300', '400', '500', '700', '900'],
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: '[COMPANY]',
	description: '[COMPANY]',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body
				className={[roboto.className, 'bg-color-surface']
					.join(' ')
					.trimEnd()}
			>
				<ToastContainer />
				<Navigation />
				<div>{children}</div>
			</body>
		</html>
	);
}
