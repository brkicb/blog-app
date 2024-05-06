'use client';

import { useRef, SetStateAction, Dispatch } from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface Props {
	labelId: string;
	setContent: Dispatch<SetStateAction<string>>;
	initialValue: string;
	content: string;
	children: React.ReactNode;
}

export default function TinyMceInput({
	labelId,
	setContent,
	initialValue,
	content,
	children,
}: Props) {
	const editorRef: any = useRef(null);

	return (
		<div>
			<div className='flex justify-between items-center'>
				<label
					htmlFor={labelId}
					className='block text-baseText leading-baseText font-bold text-color-baseText'
				>
					{children}
				</label>
			</div>
			<div className='mt-1'>
				<Editor
					apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
					onInit={(evt, editor) => (editorRef.current = editor)}
					initialValue={initialValue}
					init={{
						height: 500,
						menubar: false,
						plugins: [
							'advlist',
							'autolink',
							'lists',
							'link',
							'image',
							'charmap',
							'preview',
							'anchor',
							'searchreplace',
							'visualblocks',
							'code',
							'fullscreen',
							'insertdatetime',
							'media',
							'table',
							'code',
							'help',
							'wordcount',
						],
						toolbar:
							'undo redo | blocks | bold italic code forecolor | alignleft aligncenter alignright alignjustify | bullist numlist | link image',
						content_style:
							'body { font-family:Roboto,sans-serif; font-size:14px; }',
					}}
					onEditorChange={(newValue, editor) => setContent(newValue)}
					value={content}
				/>
			</div>
		</div>
	);
}
