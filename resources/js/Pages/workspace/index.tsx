import { Link, usePage } from "@inertiajs/react";
import { route } from 'vendor/tightenco/ziggy/src/js';
import { PageBreadcrumb } from '../../components'
import VerticalLayout from '../../layouts/Vertical';
// import { useForm } from '@inertiajs/react'
// import { router } from '@inertiajs/react'
import React, { useState } from 'react';
const WorkspaceDetails = () => {
  const workspace = usePage().props?.workspace;
  const props: any = {
    title: 'A Single Workspace',
    description: 'Single Workspace Details',
  }
  return (
    <VerticalLayout {...props}>
        <div>
        <h1>{workspace.name}</h1>
        <h2>Task Boards</h2>
        <ul>
            {workspace.boards.map((board) => (
            <Link href={`/workspaces/${workspace.id}/boards/${board.id}`} key={board.id}>
                <li>{board.name}</li>
            </Link>
            ))}
        </ul>
        </div>

    </VerticalLayout>
  );
};

export default WorkspaceDetails;
