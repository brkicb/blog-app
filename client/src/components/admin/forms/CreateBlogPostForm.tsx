'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { useFormState } from 'react-dom';
import { Form } from '@/components/form';
import { fetchAuthorList } from '@/lib/queries/authors';
import * as actions from '@/actions';
import { toast } from 'react-toastify';
import { fileTypeDescription } from '@/utils/constants';
import type { Author } from '@/types/author';

export default function CreateBlogPostForm() {
	const [isPublished, setIsPublished] = useState(false);
	const [thumbnail, setThumbnail] = useState('');
	const [authors, setAuthors] = useState<Author[]>([]);
	const [content, setContent] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetchAuthorList();
			setAuthors(data);
		};

		fetchData();
	}, []);

	const [state, formAction] = useFormState(
		actions.blogCreate.bind(null, content, isPublished),
		{
			errors: {},
		}
	);

	if (Object.keys(state.errors).length > 0) {
		toast.error('Error creating blog post');
	}

	const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			if (event.target.name === 'thumbnail') {
				setThumbnail(event.target.files[0].name);
			}
		}
	};

	const onIsPublishedChange = (event: ChangeEvent<HTMLInputElement>) => {
		setIsPublished(event.target.checked);
	};

	const config = [
		{
			labelText: 'Title',
			labelId: 'title',
			type: 'text',
			placeholder: 'Title',
			required: true,
			errors: state?.errors.title,
		},
		{
			labelText: 'Slug',
			labelId: 'slug',
			type: 'text',
			placeholder: 'Slug',
			required: true,
			errors: state?.errors.slug,
		},
		{
			labelText: 'Excerpt',
			labelId: 'excerpt',
			type: 'textarea',
			placeholder: 'Excerpt',
			required: true,
			errors: state?.errors.excerpt,
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
		{
			labelText: 'Thumbnail Alt',
			labelId: 'thumbnail_alt',
			type: 'text',
			placeholder: 'Thumbnail Alt',
			required: true,
			errors: state?.errors.thumbnail_alt,
		},
		{
			labelText: 'Author',
			labelId: 'author',
			type: 'select',
			options:
				authors.map((author: Author) => ({
					id: author.id,
					title: author.name,
				})) || [],
			defaultValue: authors.length > 0 ? authors[0].id : '',
			required: false,
			errors: state?.errors.author,
		},
		{
			labelText: 'Content',
			labelId: 'content',
			type: 'tinymce',
			setContent: setContent,
			initialValue: '',
			content: content,
			errors: state?.errors.content,
		},
		{
			labelText: 'Is Published',
			labelId: 'is_published',
			type: 'checkbox',
			onChange: onIsPublishedChange,
			placeholder:
				'Check the box to have the blog post show up to users.',
			errors: state?.errors.is_published,
		},
	];

	return (
		<Form
			config={config as any}
			btnText='Create Blog Post'
			formAction={formAction}
			errors={state?.errors._form}
		/>
	);
}
