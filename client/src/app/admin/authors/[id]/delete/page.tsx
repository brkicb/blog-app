'use client';

import { useState, useEffect } from 'react';
import { useFormState } from 'react-dom';
import { AdminButton, Breadcrumb } from '@/components/admin';
import { FormButton, Validation } from '@/components/form';
import { Heading } from '@/components/typography';
import * as actions from '@/actions';
import { fetchAuthor } from '@/lib/queries/authors';
import paths from '@/utils/paths';
import type { Author } from '@/types/author';

interface Props {
	params: {
		id: string;
	};
}

export default function Page({ params: { id } }: Props) {
	const [author, setAuthor] = useState<Author | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetchAuthor(id);
			setAuthor(data);
		};

		fetchData();
	}, [id]);

	const [state, formAction] = useFormState(
		actions.authorsDelete.bind(null, id),
		{ errors: {} }
	);

	return (
		<div>
			<Breadcrumb
				pages={[
					{
						name: 'Dashboard',
						href: paths.admin(),
						current: false,
						first: true,
					},
					{
						name: 'Authors',
						href: paths.adminAuthors(),
						current: false,
						first: false,
					},
					{
						name: author?.name || 'Back To Author',
						href: paths.adminAuthorUpdate(id),
						current: false,
						first: false,
					},
					{
						name: 'Delete Author',
						current: true,
						first: false,
					},
				]}
			/>
			<div className='py-4'>
				<Heading tertiary fontLight>
					Are you sure you want to delete this author?
				</Heading>
			</div>

			<div className='flex gap-2'>
				<AdminButton href={paths.adminAuthorUpdate(id)}>
					No, Go Back
				</AdminButton>
				<form action={formAction}>
					<FormButton
						className='inline-block flex-none rounded-md bg-red-500 px-1.4 py-0.5 text-baseText leading-baseText text-white shadow-sm hover:bg-red-400'
						inline
					>
						Yes, Delete Author
					</FormButton>
				</form>
				{state.errors._form && (
					<Validation>{state.errors._form}</Validation>
				)}
			</div>
		</div>
	);
}
