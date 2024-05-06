import cn from 'classnames';

interface Props {
	data: string;
	spacedListItems?: boolean;
}

export default function ContentWrapper({ data, spacedListItems }: Props) {
	const className = cn(
		'text-baseText leading-baseText text-color-baseText [&_h3]:text-baseText [&_h3]:leading-baseText [&_h3]:font-bold [&_h3]:mb-2 [&_p]:text-baseText [&_p]:leading-baseText [&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-2 [&_ul]:mb-2 [&_ol]:list-decimal [&_ol]:pl-2 [&_ol]:mb-2',
		{
			'[&_li]:mb-2': spacedListItems,
		}
	);

	return (
		<div
			className={className}
			dangerouslySetInnerHTML={{
				__html: data,
			}}
		/>
	);
}
