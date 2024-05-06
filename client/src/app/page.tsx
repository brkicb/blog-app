import {
	ContentSection,
	HeaderSection,
	LatestBlogSection,
} from '@/components/sections';
import type { BlogResponse } from '@/types/blog';

async function getLatestBlogPosts(): Promise<BlogResponse> {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_HOST}/api/blog/posts/?limit=3`
	);

	if (!res.ok) {
		throw new Error('Failed to fetch latest blog posts');
	}

	return res.json();
}

export default async function Page() {
	const latestBlogPosts = await getLatestBlogPosts();

	return (
		<main>
			<HeaderSection
				heading='Headline'
				subheading='Sub Headline'
				imageSrc='/images/header.jpg'
			/>
			{latestBlogPosts && latestBlogPosts.results.length > 0 && (
				<ContentSection>
					<LatestBlogSection posts={latestBlogPosts.results} />
				</ContentSection>
			)}
		</main>
	);
}
