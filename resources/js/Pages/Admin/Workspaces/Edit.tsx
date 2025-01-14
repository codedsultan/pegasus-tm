import React from 'react';
import { useForm, usePage } from '@inertiajs/react';

const WorkspaceEdit = () => {

    const workspace:any = usePage().props?.workspace;
    const { data, setData, put, errors } = useForm({
        name: workspace.name,
        description: workspace.description,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/workspaces/${workspace.id}`);
    };

    return (
        <form onSubmit={submit}>
            <input
                type="text"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
            />
            {errors.name && <div>{errors.name}</div>}

            <textarea
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
            />
            {errors.description && <div>{errors.description}</div>}

            <button type="submit">Update</button>
        </form>
    );
};

export default WorkspaceEdit;
