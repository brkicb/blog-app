import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: '*',
				disallow: '/admin/*',
			},
			{
				userAgent: '*',
				allow: '/',
			},
		],
		sitemap: 'COMPANY_URL/sitemap.xml',
	};
}
