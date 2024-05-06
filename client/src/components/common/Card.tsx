import cn from 'classnames';
import Image from 'next/image';
import { Button } from '@/components/common';
import { Heading, Paragraph } from '@/components/typography';

interface Props {
	title?: string;
	text?: string;
	imageSrc: string;
	imageAlt: string;
	href?: string;
	md?: boolean;
	lg?: boolean;
	positionBottom?: boolean;
}

export default function Card({
	title,
	text,
	imageSrc,
	imageAlt,
	href,
	md,
	lg,
	positionBottom,
}: Props) {
	const cardClassName = cn(
		'flex flex-col overflow-hidden rounded-lg shadow-md',
		{
			'w-30 h-35': md,
			'w-full max-w-35 h-42 md:h-45': lg,
		}
	);

	const bodyClassName = cn(
		'flex flex-col justify-between bg-color-primaryContainer w-full h-1/2 sm:h-3/5 md:h-1/2',
		{
			'px-2.4 py-3.5': md,
			'p-1.8 md:p-2.4': lg,
		}
	);

	const imageClassName = cn('absolute w-full h-full object-cover', {
		'object-center': !positionBottom,
		'object-bottom': positionBottom,
	});

	return (
		<div className={cardClassName}>
			<div className='relative bg-color-inverseSurface h-1/2 sm:h-2/5 md:h-1/2'>
				<Image
					className={imageClassName}
					src={imageSrc}
					alt={imageAlt}
					fill
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
				/>
			</div>
			<div className={bodyClassName}>
				<div className='space-y-1.6'>
					<Heading title themeOnPrimaryContainer>
						{title}
					</Heading>

					<Paragraph base themeOnPrimaryContainer>
						{text}
					</Paragraph>
				</div>

				{href && (
					<div className='flex justify-center'>
						<Button secondary href={href}>
							Learn More
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}
