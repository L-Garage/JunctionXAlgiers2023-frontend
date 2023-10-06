import { Home, Alert, Add, Notifications, Settings } from './svg';

export const navbar = {
	top: [
		{
			title: 'Home',
			link: '/',
			icon: Home,
		},
		{
			title: 'Alerts',
			link: '/alerts',
			icon: Alert,
		},
	],
	bottom: [
		{
			title: 'Add',
			icon: Add,
		},
		{
			title: 'Notifications',
			icon: Notifications,
		},
		{
			title: 'Settings',
			icon: Settings,
		},
	],
};
