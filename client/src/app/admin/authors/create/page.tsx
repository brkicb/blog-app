import { Heading } from '@/components/typography';
import { Breadcrumb } from '@/components/admin';
import { CreateAuthorForm } from '@/components/admin/forms';
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
						name: 'Authors',
						href: paths.adminAuthors(),
						current: false,
						first: false,
					},
					{
						name: 'Create Author',
						current: true,
						first: false,
					},
				]}
			/>
			<div className='py-4'>
				<Heading tertiary fontLight>
					Create Author
				</Heading>
			</div>
			<CreateAuthorForm />
		</div>
	);
}
