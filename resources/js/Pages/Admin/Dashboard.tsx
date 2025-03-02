import { route } from 'vendor/tightenco/ziggy/src/js';
import { PageBreadcrumb } from '../../components'
import VerticalLayout from '../../layouts/AdminVertical';
import { useForm } from '@inertiajs/react'
import { router } from '@inertiajs/react'
import React, { useState } from 'react';

const Dashboard = () => {

    const handleLogout = () => {
        router.post('/admin/logout');
    };
    const props: any = {
        title: 'Starter Page',
        description: 'Attex React is a free and open-source admin dashboard template built with React and Tailwind CSS. It is designed to be easily customizable and includes a wide range of features and components to help you build your own dashboard quickly and efficiently.',
    }
	return (
		<>
            <VerticalLayout {...props}>
			    {/* <PageBreadcrumb title="Starter Page" subName="Pages" /> */}



                <div className="dashboard">
                    <h1>Admin Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white py-2 px-4 rounded"
                    >
                        Logout
                    </button>
                </div>

            </VerticalLayout>
		</>
	)
}

export default Dashboard
