import { Button, Card } from '@/components/common';
import { Heading } from '@/components/typography';
import { BlogPost } from '@/types/blog';

interface Props {
	posts: BlogPost[];
	headingThemeLight?: boolean;
}

export default function LatestBlogSection({ posts, headingThemeLight }: Props) {
	return (
		<div className='flex flex-col gap-4 sm:gap-3.2 md:gap-6.4'>
			<Heading secondary themeLight={headingThemeLight} center>
				Our Latest Blog Posts
			</Heading>
			<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2.4 place-items-center'>
				{posts.map(post => (
					<Card
						key={`latest-blog-section-post-${post.slug}`}
						imageSrc={post.thumbnail}
						imageAlt={post.thumbnail_alt}
						title={post.title}
						text={`${post.excerpt
							.split(' ')
							.splice(0, 15)
							.join(' ')}...`}
						href={`/blog/${post.slug}`}
						lg
					/>
				))}
			</div>
			<Button href='/blog' secondary wrapped lg>
				View More
			</Button>
		</div>
	);
}
