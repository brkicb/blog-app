import {
	Checkbox,
	FileInput,
	Input,
	TextArea,
	TinyMceInput,
	Select,
	FormButton,
	Validation,
} from '@/components/form';
import cn from 'classnames';
import type { Config } from '@/types/form';

export interface Props {
	config: Config[];
	btnText: string;
	isSingleLine?: boolean;
	formAction: (payload: FormData) => void;
	errors?: string[];
	btnSm?: boolean;
}

export default function Form({
	config,
	btnText,
	isSingleLine,
	formAction,
	errors,
	btnSm,
}: Props) {
	const className = cn({
		'space-y-3': !isSingleLine,
		'flex gap-x-1.2': isSingleLine,
	});
	const btnClassName = cn(
		'flex-none rounded-md bg-color-primary px-1.2 py-0.4 text-baseText leading-baseText font-bold text-color-onPrimary shadow-sm hover:bg-color-primaryHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color-primary',
		{
			'mt-3': !isSingleLine,
			'md:text-titleText md:leading-titleText': !btnSm,
			'md:text-baseText md:leading-baseText': btnSm,
		}
	);

	return (
		<form action={formAction}>
			<div className={className}>
				{config.map(element => {
					const formInput = [];
					let el: JSX.Element;
					if (element.type === 'textarea') {
						el = (
							<TextArea
								labelId={element.labelId}
								placeholder={element.placeholder}
								required={element.required}
								defaultValue={element.defaultValue}
							>
								{element.labelText}
							</TextArea>
						);
					} else if (element.type === 'tinymce') {
						el = (
							<TinyMceInput
								labelId={element.labelId}
								setContent={element.setContent}
								initialValue={element.initialValue}
								content={element.content as string}
							>
								{element.labelText}
							</TinyMceInput>
						);
					} else if (element.type === 'file') {
						el = (
							<FileInput
								labelId={element.labelId}
								onChange={element.onChange}
								filename={element.filename}
								fileTypeDescription={
									element.fileTypeDescription
								}
								required={element.required}
							>
								{element.labelText}
							</FileInput>
						);
					} else if (element.type === 'checkbox') {
						el = (
							<Checkbox
								labelId={element.labelId}
								description={element.placeholder}
								onChange={element.onChange}
								defaultValue={element.defaultValue}
							>
								{element.labelText}
							</Checkbox>
						);
					} else if (element.type === 'select') {
						el = (
							<Select
								labelId={element.labelId}
								options={element.options}
								defaultValue={element.defaultValue}
								required={element.required}
							>
								{element.labelText}
							</Select>
						);
					} else {
						el = (
							<Input
								labelId={element.labelId}
								type={element.type}
								placeholder={element.placeholder}
								required={element.required}
								isSingleLine={isSingleLine}
								defaultValue={element.defaultValue}
								themeLight={element.themeLight}
							>
								{element.labelText}
							</Input>
						);
					}

					if (element.errors) {
						formInput.push(
							<div
								key={`form-input-${element.labelId}-${element.type}`}
							>
								{el}
								<Validation
									key={`${element.labelId}--validation`}
								>
									{element.errors[0]}
								</Validation>
							</div>
						);
					} else {
						formInput.push(
							<div
								key={`form-input-${element.labelId}-${element.type}`}
							>
								{el}
							</div>
						);
					}

					return formInput;
				})}

				<FormButton className={btnClassName}>{btnText}</FormButton>
				{errors && <Validation>{errors[0]}</Validation>}
			</div>
		</form>
	);
}
