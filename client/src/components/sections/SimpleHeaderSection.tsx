import { Heading } from '@/components/typography';

interface Props {
	heading: string;
}

export default function SimpleHeaderSection({ heading }: Props) {
	return (
		<div className='bg-color-onPrimaryContainer w-full px-2.4 md:px-4.5 py-5'>
			<div className='w-full max-w-112 mx-auto'>
				<Heading primary themePrimaryContainer>
					{heading}
				</Heading>
			</div>
		</div>
	);
}
