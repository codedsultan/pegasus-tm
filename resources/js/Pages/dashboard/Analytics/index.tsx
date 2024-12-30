// components
import Statistics from './Components/Statistics'
import SessionsByBrowser from './Components/SessionsByBrowser'
import SessionsByOS from './Components/SessionsByOS'
import ViewsPerMinute from './Components/ViewsPerMinute'
import SessionsOverview from './Components/SessionsOverview'
import SessionsByCountry from './Components/SessionsByCountry'
import TableCharts from './Components/TableCharts'
import { PageBreadcrumb } from '../../../components'
import DefaultLayout from '../../../layouts/Default';
import VerticalLayout from '../../../layouts/Vertical';
import { Head, Link } from '@inertiajs/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
// interface DefaultLayoutProps {
// 	layout: {
// 		layoutType: string
// 		layoutWidth: string
// 		sideBarTheme: string
// 		sideBarType: string
// 	}
// 	children?: any
// }

const { layoutTheme, layoutDirection, layoutWidth, topBarTheme, sideBarTheme, sideBarType, layoutPosition } = {
    layoutTheme: 'light',
    layoutDirection: 'ltr',
    layoutWidth: 'boxed',
    topBarTheme: 'light',
    sideBarTheme: 'light',
    sideBarType: 'semi-dark',
    layoutPosition: 'fixed',
    // layoutType: 'vertical',
    // isOpenRightSideBar: state.Layout.isOpenRightSideBar,
}
const Analytics = () => {
    const props: any = {
        title: 'Dasboard',
        description: 'Attex React is a free and open-source admin dashboard template built with React and Tailwind CSS. It is designed to be easily customizable and includes a wide range of features and components to help you build your own dashboard quickly and efficiently.',
    }

    const Layout = {
        layout: {
            layoutType: 'vertical',
            layoutWidth: 'boxed',
            sideBarTheme: 'light',
            sideBarType: 'semi-dark',
        },
        // children: null,
    }
	return (
		<>
            <VerticalLayout {...props}>
                {/* <PageBreadcrumb title="Analytics" subName="Menu" /> */}

                <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-6 mb-6">
                    <Statistics />
                    <SessionsByBrowser />
                    <SessionsByOS />
                    <ViewsPerMinute />
                </div>

                <div className="grid 2xl:grid-cols-2 gap-6 mb-6">
                    <SessionsOverview />
                    <SessionsByCountry />
                </div>

                <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-6">
                    <TableCharts />
                </div>
            </VerticalLayout>
		</>
	)
}

export default Analytics
