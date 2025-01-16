import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import VerticalLayout from '../../../layouts/AdminVertical';

const PlansIndex = () => {
    const plans:any  = usePage().props.plans;
    const props:any = {
        title: 'Plans',
        description: 'Plan Management',
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
                                                Name
                                            </th>
                                            <th scope="col" className="px-4 py-4 text-start text-sm font-medium text-gray-500">
                                                Price
                                            </th>
                                            <th scope="col" className="px-4 py-4 text-start text-sm font-medium text-gray-500">
                                                Billing Cycle
                                            </th>
                                            <th scope="col" className="px-4 py-4 text-start text-sm font-medium text-gray-500">
                                                Status
                                            </th>
                                            <th scope="col" className="px-4 py-4 text-start text-sm font-medium text-gray-500">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {(plans || []).map((plan:any, idx:number) => {
                                            return (
                                                <tr key={idx} className={`${idx % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : ''}`}>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">{plan.name}</td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">{plan.price}</td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">{plan.billing_cycle} months</td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">{plan.status}</td>
                                                    <td className="px-4 py-4">
                                                        <div className="flex items-center justify-start space-x-3">
                                                            <Link href="">
                                                                <i className="ri-settings-3-line text-base"></i>
                                                            </Link>
                                                            <Link href="">
                                                                <i className="ri-delete-bin-2-line text-base"></i>
                                                            </Link>
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
	return (
		<>
            <VerticalLayout {...props}>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Plans</h1>
                    <Link href="/plans/create" className="btn btn-primary">
                        Create Plan
                    </Link>
                </div>
                <Table />

            </VerticalLayout>
		</>
	)

};

export default PlansIndex;
