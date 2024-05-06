'use client';

import { useFormState } from 'react-dom';
import { Form } from '@/components/form';
import * as actions from '@/actions';

export default function LoginForm() {
	const [state, formAction] = useFormState(actions.adminLogin, {
		errors: {},
	});

	const config = [
		{
			labelText: 'Email address',
			labelId: 'email',
			type: 'email',
			placeholder: 'Enter email',
			required: true,
			errors: state.errors.email,
		},
		{
			labelText: 'Password',
			labelId: 'password',
			type: 'password',
			placeholder: 'Enter password',
			required: true,
			errors: state.errors.password,
		},
	];

	return (
		<Form
			config={config as any}
			btnText='Sign in'
			formAction={formAction}
			errors={state.errors._form}
		/>
	);
}
