'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { useFormState } from 'react-dom';
import { Form } from '@/components/form';
import { fetchAuthorList } from '@/lib/queries/authors';
import * as actions from '@/actions';
import { toast } from 'react-toastify';
import { fileTypeDescription } from '@/utils/constants';
import type { BlogPost } from '@/types/blog';
import type { Author } from '@/types/author';

interface Props {
	post: BlogPost;
}

export default function UpdateBlogPostForm({ post }: Props) {
	const [isPublished, setIsPublished] = useState(post.is_published);
	const [thumbnail, setThumbnail] = useState(post.thumbnail);
	const [authors, setAuthors] = useState<Author[]>([]);
	const [content, setContent] = useState(post.content);

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetchAuthorList();
			setAuthors(data);
		};

		fetchData();
	}, []);

	const [state, formAction] = useFormState(
		actions.blogUpdate.bind(null, post.slug, content, isPublished),
		{
			errors: {},
		}
	);

	if (Object.keys(state.errors).length > 0) {
		toast.error('Error updating blog post');
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
			defaultValue: post.title,
			labelText: 'Title',
			labelId: 'title',
			type: 'text',
			placeholder: 'Title',
			required: true,
			errors: state?.errors.title,
		},
		{
			defaultValue: post.slug,
			labelText: 'Slug',
			labelId: 'slug',
			type: 'text',
			placeholder: 'Slug',
			required: true,
			errors: state?.errors.slug,
		},
		{
			defaultValue: post.excerpt,
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
			required: false,
			errors: state?.errors.thumbnail,
		},
		{
			defaultValue: post.thumbnail_alt,
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
				authors.map((current: Author) => ({
					id: current.id.toString(),
					title: current.name,
				})) || [],
			defaultValue: post.author.id.toString(),
			required: false,
			errors: state?.errors.author,
		},
		{
			labelText: 'Content',
			labelId: 'content',
			type: 'tinymce',
			setContent: setContent,
			initialValue: post.content,
			content: content,
			errors: state.errors.content,
		},
		{
			defaultValue: post.is_published,
			labelText: 'Is Published',
			labelId: 'is_published',
			type: 'checkbox',
			onChange: onIsPublishedChange,
			value: isPublished,
			placeholder:
				'Check the box to have the blog post show up to users.',
			errors: state?.errors.is_published,
		},
	];

	return (
		<Form
			config={config as any}
			btnText='Update Blog Post'
			formAction={formAction}
			errors={state?.errors._form}
		/>
	);
}
