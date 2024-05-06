'use client';

import { useState, ChangeEvent } from 'react';
import { useFormState } from 'react-dom';
import { Form } from '@/components/form';
import { toast } from 'react-toastify';
import * as actions from '@/actions';
import { fileTypeDescription } from '@/utils/constants';
import type { Author } from '@/types/author';

interface Props {
	author: Author;
}

export default function UpdateAuthorForm({ author }: Props) {
	const [thumbnail, setThumbnail] = useState(author.thumbnail);

	const [state, formAction] = useFormState(
		actions.authorsUpdate.bind(null, author.id.toString()),
		{
			errors: {},
		}
	);

	if (Object.keys(state.errors).length > 0) {
		toast.error('Error updating author');
	}

	const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			if (event.target.name === 'thumbnail') {
				setThumbnail(event.target.files[0].name);
			}
		}
	};

	const config = [
		{
			defaultValue: author.name,
			labelText: 'Name',
			labelId: 'name',
			type: 'text',
			placeholder: 'Full name',
			required: true,
			errors: state?.errors.name,
		},
		{
			defaultValue: author.title,
			labelText: 'Title',
			labelId: 'title',
			type: 'text',
			placeholder: 'Title',
			required: true,
			errors: state?.errors.title,
		},
		{
			labelText: 'Thumbnail',
			labelId: 'thumbnail',
			type: 'file',
			filename: thumbnail,
			fileTypeDescription: fileTypeDescription.image,
			onChange: onFileChange,
			required: false,
			errors: state?.errors.thumbnail,
		},
	];

	return (
		<Form
			config={config as any}
			btnText='Update Author'
			formAction={formAction}
			errors={state?.errors._form}
		/>
	);
}
