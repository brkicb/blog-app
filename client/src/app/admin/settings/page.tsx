import { Heading, Paragraph } from '@/components/typography';
import { Breadcrumb } from '@/components/admin';
import { FormButton } from '@/components/form';
import * as actions from '@/actions';
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
						name: 'Settings',
						current: true,
						first: false,
					},
				]}
			/>
			<div className='flex justify-between items-start py-4'>
				<Heading tertiary fontLight>
					Your Settings
				</Heading>
				<form action={actions.adminLogout}>
					<FormButton className='flex-none rounded-md bg-color-primary px-1.4 py-0.5 text-baseText leading-baseText text-color-onPrimary shadow-sm hover:bg-color-primaryHover'>
						Logout
					</FormButton>
				</form>
			</div>
			<Paragraph base fontLight>
				Can add different settings options here...
			</Paragraph>
		</div>
	);
}
