import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import VerticalLayout from '../../../layouts/AdminVertical';
import { route } from 'vendor/tightenco/ziggy/src/js';
const Edit = () => {
    const user:any = usePage().props?.user;
    const { data, setData, post, errors } = useForm({
        name: user.name,
        email: user.email,
        // password: '',
    });

    const props: any = {
        title: 'Users',
        description: 'Create a new user',
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.users.update',{user:user.id}));
    };

    return (
        <VerticalLayout {...props}>
            <div>
                <h1>Create User</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        {errors.name && <p>{errors.name}</p>}
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        {errors.email && <p>{errors.email}</p>}
                    </div>
                    {/* <div>
                        <label>Password</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        {errors.password && <p>{errors.password}</p>}
                    </div> */}
                    <button type="submit">Edit</button>
                </form>
            </div>
        </VerticalLayout>
    );
};

export default Edit;
