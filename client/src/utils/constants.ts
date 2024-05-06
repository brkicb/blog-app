export const fileTypeDescription = {
	image: 'JPG, JPEG, PNG, WEBP up to 10MB',
	pdf: 'PDF up to 10MB',
};

export const CSRF_TOKEN = 'csrftoken';
export const CSRF_MAX_AGE = 31449600;
export const CSRF_SAME_SITE = 'lax';
export const ACCESS = 'access';
export const REFRESH = 'refresh';
export const HTTP_ONLY = true;
export const MAX_AGE = 86400;
export const PATH = '/';
export const SAME_SITE = 'none';
export const SECURE = process.env.NODE_ENV === 'production';
