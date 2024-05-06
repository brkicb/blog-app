interface Props {
	children: React.ReactNode;
	[rest: string]: any;
}

export default function MobileButton({ href, children, ...rest }: Props) {
	return (
		<button
			className='relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
			{...rest}
		>
			{children}
		</button>
	);
}
