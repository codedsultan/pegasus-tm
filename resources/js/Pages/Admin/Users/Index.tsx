import React from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import VerticalLayout from '../../../layouts/AdminVertical';
import { route } from 'vendor/tightenco/ziggy/src/js';
const Index = () => {
    const users:any = usePage().props?.users;
    const props: any = {
        title: 'Users',
        description: 'Manage your users',
    }
    const Table = () => {
        return (
            <div className="card">
                <div className="p-6">
                    {/* <h3 className="card-title mb-4"></h3> */}

                    <div className="overflow-x-auto">
                        <div className="min-w-full inline-block align-middle">
                            <div className="overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="px-4 py-4 text-start text-sm font-medium text-gray-500">
                                                ID
                                            </th>
                                            <th scope="col" className="px-4 py-4 text-start text-sm font-medium text-gray-500">
                                                Name
                                            </th>
                                            {/* <th scope="col" className="px-4 py-4 text-start text-sm font-medium text-gray-500">
                                                Description
                                            </th> */}
                                            <th scope="col" className="px-4 py-4 text-start text-sm font-medium text-gray-500">
                                                Email
                                            </th>
                                            <th scope="col" className="px-4 py-4 text-start text-sm font-medium text-gray-500">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {(users || []).map((user:any, idx:number) => {
                                            return (
                                                <tr key={idx} className={`${idx % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : ''}`}>
                                                    <th scope="row" className="flex items-center gap-2 px-4 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                        {/* <img className="w-8 h-8 rounded-full" src={record.image} alt="Jese image" /> */}
                                                        <div className="whitespace-nowrap text-sm font-medium text-gray-500 dark:text-gray-200">{user.id}</div>
                                                    </th>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">{user.name}</td>
                                                    {/* <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">{workspace.description}</td> */}
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">{user.email}</td>
                                                    <td className="px-4 py-4">
                                                        <div className="flex items-center justify-start space-x-3">
                                                            <Link href={`/admin/users/${user.id}/edit`}>
                                                                <i className="ri-edit-2-line text-base"></i>
                                                            </Link>

                                                            <button
                                                                onClick={() => handleDelete(user.id)}
                                                                className="text-red-500 hover:text-red-700 dark:text-red-500 dark:hover:text-red-700"
                                                            >
                                                                <i className="ri-delete-bin-2-line text-base"></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const handleDelete = (userId:any) => {
            router.delete(route('admin.users.destroy',{user:userId}), {
                onSuccess: () => {
                    console.log('User deleted successfully');
                },
            });
    };
    return (
        <VerticalLayout {...props}>
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Users</h1>
                <Link href="/admin/user/create" className="btn btn-primary">
                    Create User
                </Link>
            </div>

            <Table />
        </div>
        </VerticalLayout>
    )

};

export default Index;
