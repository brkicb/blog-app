import Link from 'next/link';
import { Heading, Paragraph } from '@/components/typography';

export default function NotFound() {
	return (
		<main className='flex justify-center items-center py-12'>
			<div className='text-center'>
				<div className='mb-1'>
					<Heading secondary>404 Not Found</Heading>
				</div>
				<div className='mb-4'>
					<Paragraph base>
						It looks like the page you are looking for is not
						present on this site.
					</Paragraph>
				</div>
				<div className='flex justify-center items-center'>
					<Link
						href='/'
						className='flex justify-center items-center rounded-md bg-color-primary px-1.4 py-0.5 text-baseText leading-baseText text-white shadow-sm hover:bg-color-primaryHover'
					>
						Go back home
					</Link>
				</div>
			</div>
		</main>
	);
}
