import type { IconType } from 'react-icons';

export interface Navigation {
	name: string;
	href: string;
	icon: IconType;
	current: boolean;
}
