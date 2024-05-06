'use client';

import { useState, useEffect, useRef } from 'react';
import { clientFetch } from '@/utils/client-fetch';

interface User {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
}

interface Session {
	user: User | null;
}

export default function useAdminSession() {
	const effectRan = useRef(false);

	const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
		'loading'
	);
	const [session, setSession] = useState<Session>({ user: null });

	useEffect(() => {
		const fetchUser = async (): Promise<User | null> => {
			setStatus('loading');

			try {
				const res = await clientFetch(
					`${process.env.NEXT_PUBLIC_HOST}/admin/users/me/`,
					{
						method: 'GET',
						credentials: 'include',
						next: {
							revalidate: 600,
						},
					}
				);
				const data: User = await res.json();
				setStatus('success');
				setSession({ user: data });

				return data;
			} catch (err) {
				setStatus('error');
			}
			return null;
		};

		if (!effectRan.current) {
			fetchUser();
		}

		return () => {
			effectRan.current = true;
		};
	}, []);

	return {
		status,
		session,
	};
}
