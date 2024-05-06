interface Props {
	children: React.ReactNode;
}

export default function Validation({ children }: Props) {
	return (
		<p className='text-smallText leading-smalltext text-red-500 font-light italic mt-0.5'>
			{children}
		</p>
	);
}
