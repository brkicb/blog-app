import cn from 'classnames';

interface Props {
	labelId: string;
	type: string;
	placeholder?: string;
	children: React.ReactNode;
	required?: boolean;
	isSingleLine?: boolean;
	defaultValue?: string;
	themeLight?: boolean;
}

export default function Input({
	labelId,
	type,
	children,
	themeLight,
	placeholder = '',
	required = false,
	isSingleLine = false,
	defaultValue = '',
}: Props) {
	if (isSingleLine) {
		const className = cn(
			'min-w-0 flex-auto rounded-lg border-0 bg-transparent px-1.2 py-0.4 shadow-sm ring-1 ring-inset placeholder:text-color-outline focus:ring-2 focus:ring-inset text-baseText leading-baseText',
			{
				'ring-color-outline focus:ring-color-primary text-color-baseText':
					!themeLight,
				'ring-color-surface focus:ring-color-surface text-color-surface':
					themeLight,
			}
		);

		return (
			<>
				<label htmlFor={labelId} className='sr-only'>
					{children}
				</label>
				<input
					id={labelId}
					className={className}
					name={labelId}
					type={type}
					placeholder={placeholder}
					required={required}
					defaultValue={defaultValue}
				/>
			</>
		);
	}

	return (
		<div>
			<label
				htmlFor={labelId}
				className='block font-bold text-baseText leading-baseText text-color-baseText text-start'
			>
				{children}
			</label>
			<div>
				<input
					id={labelId}
					className='block w-full bg-transparent rounded-lg border-0 px-1.2 py-0.4 text-color-baseText shadow-sm ring-1 ring-inset ring-color-outline placeholder:text-color-outline focus:ring-2 focus:ring-inset focus:ring-color-primary text-baseText leading-baseText font-light mt-1'
					name={labelId}
					type={type}
					placeholder={placeholder}
					required={required}
					defaultValue={defaultValue}
				/>
			</div>
		</div>
	);
}
