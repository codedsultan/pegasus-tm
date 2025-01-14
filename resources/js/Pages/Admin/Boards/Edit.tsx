import React from 'react';
import { useForm, usePage } from '@inertiajs/react';

const BoardEdit = () => {
    const board:any = usePage().props?.board;
    const { data, setData, put, errors } = useForm({
        name: board.name,
        workspace_id: board.workspace_id,  // Assuming workspace_id is needed for the relationship
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/boards/${board.id}`);
    };

    return (
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
                    <label htmlFor="workspace_id">Workspace</label>
                    <select
                        id="workspace_id"
                        value={data.workspace_id}
                        onChange={(e) => setData('workspace_id', e.target.value)}
                    >
                        {/* Assuming you have a list of workspaces to choose from */}
                        <option value="">Select Workspace</option>
                        {/* Populate workspaces here */}
                    </select>
                    {errors.workspace_id && <div>{errors.workspace_id}</div>}
                </div>

                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default BoardEdit;
