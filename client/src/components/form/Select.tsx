interface Props {
	labelId: string;
	options: { id: string; title: string }[];
	defaultValue: string;
	children: React.ReactNode;
	required?: boolean;
}

export default function Select({
	labelId,
	options,
	defaultValue,
	children,
	required,
}: Props) {
	return (
		<div>
			<label
				className='block text-baseText leading-baseText font-bold text-color-baseText'
				htmlFor={labelId}
			>
				{children}
			</label>
			{options.length > 0 && (
				<select
					id={labelId}
					className='mt-1 block w-full bg-transparent rounded-md border-0 px-1.2 py-0.4 text-color-baseText ring-1 ring-inset ring-color-outline focus:ring-2 focus:ring-color-primary text-baseText leading-baseText'
					name={labelId}
					required={required}
					defaultValue={defaultValue}
				>
					{options.map(cat => (
						<option key={`${cat.title}-${cat.id}`} value={cat.id}>
							{cat.title}
						</option>
					))}
				</select>
			)}
		</div>
	);
}
