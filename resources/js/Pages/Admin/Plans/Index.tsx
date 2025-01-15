import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import VerticalLayout from '../../../layouts/AdminVertical';

const PlansIndex = () => {
    const plans:any  = usePage().props.plans;
    const props: any = {
        title: 'Starter Page',
        description: 'Attex React is a free and open-source admin dashboard template built with React and Tailwind CSS. It is designed to be easily customizable and includes a wide range of features and components to help you build your own dashboard quickly and efficiently.',
    }
	return (
		<>
            <VerticalLayout {...props}>
                <div>
                    <h1>Plans</h1>
                    <Link href="/plans/create" className="btn btn-primary">Create Plan</Link>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Billing Cycle</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {plans?.map((plan:any) => (
                                <tr key={plan.id}>
                                    <td>{plan.name}</td>
                                    <td>${plan.price}</td>
                                    <td>{plan.billing_cycle} months</td>
                                    <td>{plan.status}</td>
                                    <td>
                                        <Link href={`/plans/${plan.id}/edit`}>Edit</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </VerticalLayout>
		</>
	)

};

export default PlansIndex;
