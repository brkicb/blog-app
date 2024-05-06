import { Breadcrumb as CommonBreadcrumb } from '@/components/common';

interface Page {
	name: string;
	href?: string;
	current: boolean;
	first: boolean;
}

interface Props {
	pages: Page[];
}

export default function Breadcrumb({ pages }: Props) {
	return (
		<div className='bg-color-secondaryContainer text-color-onSecondaryContainer px-4 py-2 rounded shadow'>
			<CommonBreadcrumb pages={pages} />
		</div>
	);
}
