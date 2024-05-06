import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: 'COMPANY_URL',
			lastModified: new Date(),
		},
		{
			url: 'COMPANY_URL/blog',
			lastModified: new Date(),
		},
	];
}
