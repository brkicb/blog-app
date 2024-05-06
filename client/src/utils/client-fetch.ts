import { getCSRFToken } from '@/utils/get-csrf-token';

export async function clientFetch(url: string, options: any): Promise<any> {
	let response = await fetch(url, options);

	const csrfToken = getCSRFToken();

	if (!csrfToken) {
		return response;
	}

	if (response.status === 401) {
		await fetch(`${process.env.NEXT_PUBLIC_HOST}/admin/jwt/refresh/`, {
			method: 'POST',
			mode: 'cors',
			headers: {
				Accept: 'application/json',
				'X-CSRFToken': csrfToken,
			},
			credentials: 'include',
		});

		response = await fetch(url, options);
	}

	return response;
}
