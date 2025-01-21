import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import VerticalLayout from '../../../layouts/AdminVertical';
const WorkspaceCreate = () => {
    const { data, setData, post, errors } = useForm({
        name: '',
        description: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/workspaces');
    };

    const props: any = {
        title: 'Workspaces',
        description: 'Create a new workspace',
    }

    return (
        <VerticalLayout {...props}>
            <form onSubmit={submit}>
                <input
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="Workspace Name"
                />
                {errors.name && <div>{errors.name}</div>}

                <textarea
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    placeholder="Description"
                />
                {errors.description && <div>{errors.description}</div>}

                <button type="submit">Create</button>
            </form>
        </VerticalLayout>
    );
};

export default WorkspaceCreate;
