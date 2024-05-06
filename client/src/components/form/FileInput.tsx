import { ChangeEvent } from 'react';
import { HiPhoto } from 'react-icons/hi2';
import { Paragraph } from '../typography';

interface Props {
	labelId: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	filename: string;
	fileTypeDescription: string;
	children: React.ReactNode;
	required?: boolean;
}

export default function FileInput({
	labelId,
	onChange,
	filename,
	fileTypeDescription,
	children,
	required = false,
}: Props) {
	return (
		<div className='w-full'>
			<label className='block text-baseText leading-baseText font-bold text-color-baseText'>
				{children}
			</label>
			<div className='flex justify-center rounded-lg border border-dashed border-color-outline px-6 py-10 mt-1'>
				<div className='text-center'>
					<HiPhoto
						className='mx-auto h-6 w-6 text-color-outline'
						aria-hidden='true'
					/>
					<div className='mt-1.5 mb-0.5 flex text-baseText leading-baseText text-color-baseText'>
						<label
							className='relative cursor-pointer font-bold text-color-primary hover:text-color-primaryHover'
							htmlFor={labelId}
						>
							<span>{filename ? filename : 'Upload a file'}</span>
							<input
								id={labelId}
								className='sr-only'
								type='file'
								name={labelId}
								onChange={onChange}
								required={required}
							/>
						</label>
						<div className='pl-0.5'>
							<Paragraph base>or drag and drop</Paragraph>
						</div>
					</div>
					<Paragraph small>{fileTypeDescription}</Paragraph>
				</div>
			</div>
		</div>
	);
}
