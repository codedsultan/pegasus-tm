import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import VerticalLayout from '../../../layouts/AdminVertical';
import { route } from 'vendor/tightenco/ziggy/src/js';
const WorkspaceEdit = () => {

    const workspace:any = usePage().props?.workspace;
    const { data, setData, post, errors } = useForm({
        name: workspace.name,
        description: workspace.description,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.workspaces.update',{workspace:workspace.id}));
    };

    const props: any = {
        title: 'Workspaces',
        description: 'Edit workspace',
    }

    return (
        <VerticalLayout {...props}>
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
        </VerticalLayout>
    );
};

export default WorkspaceEdit;
