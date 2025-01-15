import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import VerticalLayout from '../../../layouts/AdminVertical';
const WorkspaceIndex = () => {

    const workspaces:any = usePage().props?.workspaces;
    const props: any = {
        title: 'Starter Page',
        description: 'Attex React is a free and open-source admin dashboard template built with React and Tailwind CSS. It is designed to be easily customizable and includes a wide range of features and components to help you build your own dashboard quickly and efficiently.',
    }
    return (
        <VerticalLayout {...props}>
            <div>
                <h1>Workspaces</h1>
                <Link href="/admin/workspaces/create">Create Workspace</Link>
                <ul>
                    {workspaces?.map((workspace:any) => (
                        <li key={workspace.id}>
                            {workspace.name} - {workspace.description}
                            <Link href={`/admin/workspaces/${workspace.id}/edit`}>Edit</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </VerticalLayout>
    );
};

export default WorkspaceIndex;
