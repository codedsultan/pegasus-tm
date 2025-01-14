import React from 'react';
import { Link, usePage } from '@inertiajs/react';

const WorkspaceIndex = () => {

    const workspaces:any = usePage().props?.workspaces;
    return (
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
    );
};

export default WorkspaceIndex;
