import Image from 'next/image';
import cn from 'classnames';
import { CallToAction } from '@/components/common';
import { Heading } from '@/components/typography';

interface Props {
	heading: string;
	subheading: string;
	imageSrc: string;
	dark?: boolean;
}

export default function HeaderSection({
	heading,
	subheading,
	imageSrc,
	dark,
}: Props) {
	const backdropClassName = cn('w-full h-full bg-black', {
		'opacity-40': !dark,
		'opacity-60': dark,
	});

	return (
		<header className='relative w-full h-56 sm:h-68.8'>
			<div className='absolute inset-0'>
				<div className='relative w-full h-full'>
					<Image
						className='absolute object-cover'
						src={imageSrc}
						alt='header'
						fill
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 30vw'
					/>
					<div className={backdropClassName} />
				</div>
			</div>

			<div className='absolute inset-0 flex justify-center items-center px-2.4 sm:px-4.5'>
				<div className='max-w-105.2'>
					<div className='flex flex-col items-center text-center'>
						<div className='mb-2.4'>
							<Heading primary themeLight>
								{heading}
							</Heading>
						</div>
						<div className='mb-8 sm:mb-9.6'>
							<Heading tertiary themeLight>
								{subheading}
							</Heading>
						</div>
						<CallToAction href='#'>Call To Action</CallToAction>
					</div>
				</div>
			</div>
		</header>
	);
}
