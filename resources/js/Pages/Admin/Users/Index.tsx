import React from 'react';
import { Link, usePage } from '@inertiajs/react';

const Index = () => {
    const users:any = usePage().props?.users;

    return (
        <div>
            <h1>Users</h1>
            <Link href="/admin/users/create">Create User</Link>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user:any) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <Link href={`/admin/users/${user.id}/edit`}>Edit</Link>
                                <Link
                                    as="button"
                                    method="delete"
                                    href={`/admin/users/${user.id}`}
                                >
                                    Delete
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Index;
