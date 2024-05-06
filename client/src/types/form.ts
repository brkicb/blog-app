import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export interface InputConfig {
	labelText: string;
	labelId: string;
	type: 'text' | 'email' | 'password' | 'date';
	placeholder: string;
	required?: boolean;
	defaultValue?: string;
	errors?: string[] | undefined;
	themeLight?: boolean;
}

export interface TextAreaConfig {
	labelText: string;
	labelId: string;
	type: 'textarea';
	placeholder: string;
	required?: boolean;
	defaultValue?: string;
	errors?: string[] | undefined;
}

export interface TinyMceInputConfig {
	labelText: string;
	labelId: string;
	type: 'tinymce';
	setContent: Dispatch<SetStateAction<string>>;
	initialValue: string;
	content: string;
	errors?: string[] | undefined;
}

export interface FileInputConfig {
	labelText: string;
	labelId: string;
	type: 'file';
	filename: string;
	fileTypeDescription: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
	errors?: string[] | undefined;
}

export interface CheckboxConfig {
	labelText: string;
	labelId: string;
	type: 'checkbox';
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	placeholder: string;
	defaultValue?: boolean;
	errors?: string[] | undefined;
}

export interface SelectConfig {
	labelText: string;
	labelId: string;
	type: 'select';
	options: { id: string; title: string }[];
	defaultValue: string;
	required?: boolean;
	errors?: string[] | undefined;
}

export type Config =
	| InputConfig
	| TextAreaConfig
	| TinyMceInputConfig
	| FileInputConfig
	| CheckboxConfig
	| SelectConfig;
