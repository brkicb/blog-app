interface Props {
	labelId: string;
	placeholder: string;
	children: React.ReactNode;
	required?: boolean;
	defaultValue?: string;
}

export default function TextArea({
	labelId,
	placeholder,
	children,
	required = false,
	defaultValue = '',
}: Props) {
	return (
		<div>
			<label
				htmlFor='message'
				className='block text-baseText font-bold leading-baseText text-color-baseText'
			>
				{children}
			</label>
			<div className='mt-1'>
				<textarea
					id={labelId}
					className='block w-full bg-transparent rounded-md border-0 px-1.2 py-0.6 text-color-baseText shadow-sm ring-1 ring-inset ring-color-outline placeholder:text-color-outline focus:ring-2 focus:ring-inset focus:ring-color-primary text-baseText leading-baseText'
					name={labelId}
					rows={6}
					placeholder={placeholder}
					required={required}
					defaultValue={defaultValue}
				/>
			</div>
		</div>
	);
}
