export interface MenuItemTypes {
	key: string
	label: string
	isTitle?: boolean
	icon?: string
	url?: string
	badge?: {
		variant: string
		text: string
	}
	parentKey?: string
	target?: string
	children?: MenuItemTypes[]
}

const MENU_ITEMS: MenuItemTypes[] = [
	{
		key: 'navigation',
		label: 'Navigation',
		isTitle: true,
	},
    {
        key: 'dashboard',
        label: 'Dashboard',
        url: '/dashboard',
        isTitle: false,
		icon: 'ri-home-4-line'
    },
    // {
    //     key: 'boards',
    //     label: 'Boards',
    //     url: '/boards',
    //     isTitle: false,
	// 	icon: 'ri-pages-line',
    // },
    // {
    //     key: 'workspaces',
    //     label: 'Workspaces',
    //     url: '/workspaces',
    //     isTitle: false,
	// 	icon: 'ri-pages-line',
    // },

	// {
	// 	key: 'pages',
	// 	label: 'Pages',
	// 	isTitle: false,
	// 	icon: 'ri-pages-line',
	// 	children: [
	// 		{
	// 			key: 'pages-starter',
	// 			label: 'Starter Page',
	// 			url: '/starter',
	// 			parentKey: 'pages',
	// 		},
	// 		{
	// 			key: 'pages-profile',
	// 			label: 'Profile',
	// 			url: '/profile',
	// 			parentKey: 'pages',
	// 		},

	// 	],
	// },

]

const ADMIN_MENU_ITEMS: MenuItemTypes[] = [
	{
		key: 'navigation',
		label: 'Navigation',
		isTitle: true,
	},
    {
        key: 'dashboard',
        label: 'Dashboard',
        url: '/admin/dashboard',
        isTitle: false,
		icon: 'ri-home-4-line'
    },
    {
        key: 'users',
        label: 'Users',
        url: '/admin/users',
        isTitle: false,
		icon: 'ri-user-3-line',
    },
    {
        key: 'boards',
        label: 'Boards',
        url: '/admin/boards',
        isTitle: false,
		icon: 'ri-pages-line',
    },
    {
        key: 'workspaces',
        label: 'Workspaces',
        url: '/admin/workspaces',
        isTitle: false,
		icon: 'ri-pages-line',
    },
    {
        key: 'plans',
        label: 'Plans',
        url: '/admin/plans',
        isTitle: false,
		icon: 'ri-pages-line',
    },
    {
        key: 'subscriptions',
        label: 'Subscriptions',
        url: '/admin/subscriptions',
        isTitle: false,
		icon: 'ri-pages-line',
    },

	// {
	// 	key: 'pages',
	// 	label: 'Pages',
	// 	isTitle: false,
	// 	icon: 'ri-pages-line',
	// 	children: [
	// 		{
	// 			key: 'pages-starter',
	// 			label: 'Starter Page',
	// 			url: '/starter',
	// 			parentKey: 'pages',
	// 		},
	// 		{
	// 			key: 'pages-profile',
	// 			label: 'Profile',
	// 			url: '/profile',
	// 			parentKey: 'pages',
	// 		},

	// 	],
	// },

]


export { MENU_ITEMS , ADMIN_MENU_ITEMS}
