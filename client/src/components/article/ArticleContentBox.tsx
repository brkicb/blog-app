import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/utils/format-date';
import type { BlogPost } from '@/types/blog';

interface Props {
	baseUrl: string;
	post: BlogPost;
}

export default function ArticleContentBox({ baseUrl, post }: Props) {
	return (
		<Link
			className='block hover:bg-color-secondaryContainer rounded-lg w-full p-2.5'
			href={`${baseUrl}/${post.slug}`}
		>
			<article
				key={`blog-post-${post.id}`}
				className='grid sm:grid-rows-[max-content,_max-content,_max-content,_1fr] grid-cols-1 sm:grid-cols-[25rem_minmax(0,_1fr)] lg:grid-cols-[30rem_minmax(0,_1fr)] gap-x-4.8 w-full h-full'
			>
				<div className='relative block w-full h-25 rounded-lg bg-black row-start-3 row-end-4 sm:row-end-5 md:row-start-1'>
					<Image
						className='object-contain'
						src={post.thumbnail}
						alt={post.thumbnail_alt}
						fill
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 30vw'
					/>
				</div>
				<time
					className='text-smallText leading-smallText text-color-textVariant mb-1.2 col-start-1 col-end-2 sm:col-end-3 md:col-start-2'
					dateTime={post.date_created}
				>
					{formatDate(post.date_created)}
				</time>
				<h3 className='text-titleText leading-titleText text-color-baseText mb-2.4 col-start-1 col-end-2 sm:col-end-3 md:col-start-2'>
					{post.title}
				</h3>
				<p className='text-baseText leading-baseText text-color-variantText mt-2.4 sm:mt-0'>
					{post.excerpt}
				</p>
				{post.author && (
					<div className='flex items-center gap-x-2.4 border-t border-color-outline pt-2.4 mt-2.4 sm:mt-auto'>
						<div className='relative w-5 h-5'>
							<Image
								className='rounded-full bg-color-black'
								src={post.author.thumbnail}
								alt='profile'
								fill
								sizes='720px'
							/>
						</div>
						<div className='space-y-0.4'>
							<p className='text-baseText leading-baseText text-color-baseText'>
								{post.author.name}
							</p>
							<p className='text-smallText leading-smallText text-color-variantText'>
								{post.author.title}
							</p>
						</div>
					</div>
				)}
			</article>
		</Link>
	);
}
