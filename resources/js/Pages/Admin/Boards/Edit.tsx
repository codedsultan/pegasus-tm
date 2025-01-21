import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import VerticalLayout from '../../../layouts/AdminVertical';
import { route } from 'vendor/tightenco/ziggy/src/js';
const BoardEdit = () => {
    const board:any = usePage().props?.board;
    const workspaces:any = usePage().props?.workspaces;
    const { data, setData, post, errors } = useForm({
        name: board.name,
        description: board.description,
        // workspace_id: board.workspace_id,  // Assuming workspace_id is needed for the relationship
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        // put(`/admin/boards/${board.id}`);
        post(route('admin.boards.update',{board:board.id}));

    };

    const props: any = {
        title: 'Boards',
        description: 'Edit board',
    }
    return (
        <VerticalLayout {...props}>
            <div>
                <h1>Edit Board</h1>
                <form onSubmit={submit}>
                    <div>
                        <label htmlFor="name">Board Name</label>
                        <input
                            type="text"
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        {errors.name && <div>{errors.name}</div>}
                    </div>

                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        ></textarea>
                        {errors.description && <div>{errors.description}</div>}
                    </div>

                    {/* <div>
                        <label htmlFor="workspace_id">Workspace</label>
                        <select
                            id="workspace_id"
                            value={data.workspace_id}
                            onChange={(e) => setData('workspace_id', e.target.value)}
                        >
                            <option value="">Select Workspace</option>
                        </select>
                        {errors.workspace_id && <div>{errors.workspace_id}</div>}
                    </div> */}

                    <button type="submit">Update</button>
                </form>
            </div>
        </VerticalLayout>
    );
};

export default BoardEdit;
