import cn from 'classnames';

interface Props {
	primary?: boolean;
	secondary?: boolean;
	tertiary?: boolean;
	title?: boolean;
	fontRegular?: boolean;
	fontLight?: boolean;
	uppercase?: boolean;
	themeLight?: boolean;
	themeSurface?: boolean;
	themePrimaryContainer?: boolean;
	themeOnPrimaryContainer?: boolean;
	themeOnSecondaryContainer?: boolean;
	themeOnTertiaryContainer?: boolean;
	styleItalic?: boolean;
	center?: boolean;
	children: React.ReactNode;
}

export default function Heading({
	primary,
	secondary,
	tertiary,
	title,
	fontRegular,
	fontLight,
	uppercase,
	themeLight,
	themeSurface,
	themePrimaryContainer,
	themeOnPrimaryContainer,
	themeOnSecondaryContainer,
	themeOnTertiaryContainer,
	styleItalic,
	center,
	children,
}: Props) {
	const className = cn('font-bold text-color-baseText', {
		'text-headingTertiary leading-headingTertiary sm:text-headingSecondary sm:leading-headingSecondary lg:text-headingPrimary lg:leading-headingPrimary':
			primary,
		'text-headingTertiary leading-headingTertiary lg:text-headingSecondary lg:leading-headingSecondary':
			secondary,
		'text-baseText leading-baseText sm:text-titleText sm:leading-titleText lg:text-headingTertiary lg:leading-headingTertiary':
			tertiary,
		'text-baseText leading-baseText lg:text-titleText lg:leading-titleText':
			title,
		'font-base': fontRegular,
		'font-light': fontLight,
		uppercase: uppercase,
		'text-color-onPrimary': themeLight,
		'text-color-surface': themeSurface,
		'text-color-primaryContainer': themePrimaryContainer,
		'text-color-onPrimaryContainer': themeOnPrimaryContainer,
		'text-color-onSecondaryContainer': themeOnSecondaryContainer,
		'text-color-onTertiaryContainer': themeOnTertiaryContainer,
		italic: styleItalic,
		'text-center': center,
	});

	if (primary) {
		return <h1 className={className}>{children}</h1>;
	} else if (secondary) {
		return <h2 className={className}>{children}</h2>;
	} else if (tertiary) {
		return <h3 className={className}>{children}</h3>;
	} else if (title) {
		return <h4 className={className}>{children}</h4>;
	} else {
		return <h1 className={className}>{children}</h1>;
	}
}
