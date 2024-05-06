import { ChangeEvent } from 'react';

interface Props {
	labelId: string;
	description: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	children: React.ReactNode;
	defaultValue?: boolean;
}

export default function Checkbox({
	labelId,
	description,
	onChange,
	children,
	defaultValue = false,
}: Props) {
	return (
		<div className='relative flex items-center'>
			<div className='flex items-center'>
				<input
					id={labelId}
					className='h-1.5 w-1.5 rounded border-color-outline text-color-blue'
					name={labelId}
					type='checkbox'
					onChange={onChange}
					defaultChecked={defaultValue}
				/>
			</div>
			<div className='text-baseText leading-baseText ml-1'>
				<label
					htmlFor={labelId}
					className='font-bold text-color-baseText'
				>
					{children}
				</label>{' '}
				<span
					id='candidates-description'
					className='text-color-outline ml-0.5'
				>
					{description}
				</span>
			</div>
		</div>
	);
}
