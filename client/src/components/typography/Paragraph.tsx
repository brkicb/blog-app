import cn from 'classnames';

interface Props {
	small?: boolean;
	base?: boolean;
	title?: boolean;
	fontLight?: boolean;
	fontBold?: boolean;
	underline?: boolean;
	themeLight?: boolean;
	themeOnPrimaryContainer?: boolean;
	themeOnSecondaryContainer?: boolean;
	themeOnTertiaryContainer?: boolean;
	themeOutline?: boolean;
	themeOutlineVariant?: boolean;
	styleItalic?: boolean;
	styleCaption?: boolean;
	marginBottom?: boolean;
	children: React.ReactNode;
}

export default function Paragraph({
	small,
	base,
	title,
	fontLight,
	fontBold,
	underline,
	themeLight,
	themeOnPrimaryContainer,
	themeOnSecondaryContainer,
	themeOnTertiaryContainer,
	themeOutline,
	themeOutlineVariant,
	styleItalic,
	styleCaption,
	marginBottom,
	children,
}: Props) {
	const className = cn('text-color-baseText', {
		'text-smallText leading-smallText': small,
		'text-baseText leading-baseText': base,
		'text-baseText leading-baseText sm:text-titleText sm:leading-titleText':
			title,
		'font-light': fontLight,
		'font-bold': fontBold,
		underline: underline,
		'text-color-surface': themeLight,
		'text-color-onPrimaryContainer': themeOnPrimaryContainer,
		'text-color-onSecondaryContainer': themeOnSecondaryContainer,
		'text-color-onTertiaryContainer': themeOnTertiaryContainer,
		'text-color-outline': themeOutline,
		'text-color-outlineVariant': themeOutlineVariant,
		italic: styleItalic,
		'opacity-50': styleCaption,
		'mb-2': marginBottom,
	});

	if (small) {
		return <p className={className}>{children}</p>;
	} else if (base) {
		return <p className={className}>{children}</p>;
	} else if (title) {
		return <p className={className}>{children}</p>;
	} else {
		return <p className={className}>{children}</p>;
	}
}
