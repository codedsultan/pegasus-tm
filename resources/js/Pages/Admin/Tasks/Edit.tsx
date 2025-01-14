import React from 'react';
import { useForm, usePage } from '@inertiajs/react';

const TaskEdit = () => {
    const task:any = usePage().props?.task;
    const { data, setData, put, errors } = useForm({
        title: task.title,
        description: task.description,
        board_id: task.board_id,  // Assuming a board_id field
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/tasks/${task.id}`);
    };

    return (
        <div>
            <h1>Edit Task</h1>
            <form onSubmit={submit}>
                <div>
                    <label htmlFor="title">Task Title</label>
                    <input
                        type="text"
                        id="title"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                    />
                    {errors.title && <div>{errors.title}</div>}
                </div>

                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                    />
                    {errors.description && <div>{errors.description}</div>}
                </div>

                <div>
                    <label htmlFor="board_id">Board</label>
                    <select
                        id="board_id"
                        value={data.board_id}
                        onChange={(e) => setData('board_id', e.target.value)}
                    >
                        <option value="">Select Board</option>
                        {/* Populate boards here */}
                    </select>
                    {errors.board_id && <div>{errors.board_id}</div>}
                </div>

                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default TaskEdit;
