import { ReactNode } from 'react'
import { Helmet } from 'react-helmet'
import { Head, Link } from '@inertiajs/react';

interface PageTitleProps {
	subName?: {
        id: string
        name: string
        url: string
    }
	title: {
        id: string
        name: string,
        url: string
    }
	addedChild?: ReactNode
}

const PageBreadcrumb = ({ subName, title, addedChild }: PageTitleProps) => {
    const home = {
        id: 'home',
        name: 'Workspaces',
        url: '/dashboard',
    }
	const breadcrumbItems = [home, subName, title]
	return (
		<>
			<Helmet>
				<title>{title.name} </title>
			</Helmet>
			{subName && (
				<div className="flex justify-between items-center mb-6">
					<div className="flex gap-4">
						<h4 className="text-slate-900 dark:text-slate-200 text-lg font-medium">{title.name}</h4>
						{addedChild}
					</div>
					<div className="md:flex hidden items-center gap-2.5 font-semibold">
						{(breadcrumbItems || []).map((item, idx) => (
							<div className="flex items-center gap-2" key={idx}>
								{idx != 0 && <i className="ri-arrow-right-s-line text-base text-slate-400 rtl:rotate-180" />}
								<Link href={item?.url || '/'} className="text-sm font-medium text-slate-700 dark:text-slate-400">
									{item?.name}
								</Link>
							</div>
						))}
					</div>
				</div>
			)}
		</>
	)
}

export default PageBreadcrumb
