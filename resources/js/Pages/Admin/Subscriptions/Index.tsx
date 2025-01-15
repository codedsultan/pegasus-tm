import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import VerticalLayout from '../../../layouts/AdminVertical';
const SubscriptionsIndex = () => {
    const  subscriptions:any  = usePage().props.subscriptions;
    const props: any = {
        title: 'Starter Page',
        description: 'Attex React is a free and open-source admin dashboard template built with React and Tailwind CSS. It is designed to be easily customizable and includes a wide range of features and components to help you build your own dashboard quickly and efficiently.',
    }
	return (
		<>
            <VerticalLayout {...props}>
                <div>
                    <h1>Subscriptions</h1>
                    <Link href="/subscriptions/create" className="btn btn-primary">Add Subscription</Link>
                    <table>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Plan</th>
                                <th>Status</th>
                                <th>Started At</th>
                                <th>Ends At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subscriptions.map((subscription : any) => (
                                <tr key={subscription.id}>
                                    <td>{subscription.user.name}</td>
                                    <td>{subscription.plan.name}</td>
                                    <td>{subscription.status}</td>
                                    <td>{subscription.started_at}</td>
                                    <td>{subscription.ends_at || 'N/A'}</td>
                                    <td>
                                        <Link href={`/subscriptions/${subscription.id}/edit`}>Edit</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
    {/* ); */}
            </VerticalLayout>
		</>
	)
};

export default SubscriptionsIndex;
