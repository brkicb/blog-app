import { Heading } from '@/components/typography';
import { Breadcrumb } from '@/components/admin';
import { CreateBlogPostForm } from '@/components/admin/forms';
import paths from '@/utils/paths';

export default function Page() {
	return (
		<div>
			<Breadcrumb
				pages={[
					{
						name: 'Dashboard',
						href: paths.admin(),
						current: false,
						first: true,
					},
					{
						name: 'Blog',
						href: paths.adminBlogPosts(),
						current: false,
						first: false,
					},
					{
						name: 'Create Blog Post',
						current: true,
						first: false,
					},
				]}
			/>
			<div className='py-4'>
				<Heading tertiary fontLight>
					Create Blog Post
				</Heading>
			</div>
			<CreateBlogPostForm />
		</div>
	);
}
