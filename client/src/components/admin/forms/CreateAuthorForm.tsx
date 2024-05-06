'use client';

import { useState, ChangeEvent } from 'react';
import { useFormState } from 'react-dom';
import { Form } from '@/components/form';
import * as actions from '@/actions';
import { toast } from 'react-toastify';
import { fileTypeDescription } from '@/utils/constants';

export default function CreateAuthorForm() {
	const [thumbnail, setThumbnail] = useState('');

	const [state, formAction] = useFormState(actions.authorsCreate, {
		errors: {},
	});

	if (Object.keys(state?.errors).length > 0) {
		toast.error('Error creating author');
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
			labelText: 'Name',
			labelId: 'name',
			type: 'text',
			placeholder: 'Full name',
			required: true,
			errors: state?.errors.name,
		},
		{
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
			required: true,
			errors: state?.errors.thumbnail,
		},
	];

	return (
		<Form
			config={config as any}
			btnText='Create Author'
			formAction={formAction}
			errors={state?.errors._form}
		/>
	);
}
