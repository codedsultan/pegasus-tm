import { Link, usePage } from "@inertiajs/react";
import { route } from 'vendor/tightenco/ziggy/src/js';
import { PageBreadcrumb } from '../../components'
import VerticalLayout from '../../layouts/Vertical';
// import { useForm } from '@inertiajs/react'
// import { router } from '@inertiajs/react'
import React, { useState } from 'react';

const WorkspaceList = () => {
    // const workspaces = [
    //     {
    //         id: 1,
    //         name: "Attex",
    //         description: "Attex is a free and open-source admin dashboard template built with React and Tailwind CSS. It is designed to be easily customizable and includes a wide range of features and components to help you build your own dashboard quickly and efficiently.",
    //     },
    //     {
    //         id: 2,
    //         name: "Attex",
    //         description: "Attex is a free and open-source admin dashboard template built with React and Tailwind CSS. It is designed to be easily customizable and includes a wide range of features and components to help you build your own dashboard quickly and efficiently.",
    //     },
    // ];
    const workspaces = usePage().props?.workspaces;
    const props: any = {
        title: 'Starter Page',
        description: 'Attex React is a free and open-source admin dashboard template built with React and Tailwind CSS. It is designed to be easily customizable and includes a wide range of features and components to help you build your own dashboard quickly and efficiently.',
    }
	return (
		<>
            <VerticalLayout {...props}>
                <div>
                <h1>Your Workspaces</h1>
                <ul>
                    {workspaces.map((workspace) => (
                    <li key={workspace.id}>
                        <Link href={`/workspaces/${workspace.id}`}>{workspace.name}</Link>
                    </li>
                    ))}
                </ul>
                <Link href="/workspaces/create" className="btn btn-primary">
                    Create New Workspace
                </Link>
                </div>
            </VerticalLayout>
        </>
  );
};

export default WorkspaceList;
