'use client';

import { useFormStatus } from 'react-dom';
import { Spinner } from '@/components/common';

interface Props {
	className: string;
	inline?: boolean;
	themeLight?: boolean;
	children: React.ReactNode;
}

export default function FormButton({
	className,
	inline,
	themeLight,
	children,
}: Props) {
	const { pending } = useFormStatus();

	return (
		<>
			{pending ? (
				<Spinner
					sm
					marginTop={inline ? false : true}
					themeLight={themeLight}
				/>
			) : (
				<button type='submit' className={className} disabled={pending}>
					{children}
				</button>
			)}
		</>
	);
}
