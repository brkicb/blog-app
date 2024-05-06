import Link from 'next/link';
import cn from 'classnames';

interface Props {
	href: string;
	children: React.ReactNode;
	disabled?: boolean;
	createBtn?: boolean;
	deleteBtn?: boolean;
	navBtn?: boolean;
}

export default function AdminButton({
	href,
	children,
	disabled,
	createBtn,
	deleteBtn,
	navBtn,
}: Props) {
	const className = cn(
		'flex-none rounded-md bg-color-primary px-1.4 py-0.5 text-baseText leading-baseText text-color-onPrimary shadow-sm hover:bg-color-primaryHover',
		{
			'bg-green-500 hover:bg-green-400': createBtn,
			'bg-red-500 hover:bg-red-400': deleteBtn,
			'bg-gray-500 hover:bg-gray-400': navBtn,
		}
	);

	if (disabled) {
		return (
			<button className={`${className} cursor-not-allowed`} disabled>
				{children}
			</button>
		);
	}

	return (
		<Link className={className} href={href}>
			{children}
		</Link>
	);
}
