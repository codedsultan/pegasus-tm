import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import VerticalLayout from '../../../layouts/AdminVertical';
import { route } from 'vendor/tightenco/ziggy/src/js';
const EditSubscription = () => {
    const subscription:any = usePage().props.subscription;
    const plans:any = usePage().props.plans;
    const users:any = usePage().props.users;
    const { data, setData, post, errors } = useForm({
        user_id: subscription.user_id,
        plan_id: subscription.plan_id,
        started_at: subscription.started_at,
        ends_at: subscription.ends_at,
        status: subscription.status,
    });

    const props: any = {
        title: 'Subscriptions',
        description: 'Edit subscription',
    }
    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();

        post(route('admin.subscriptions.update',{subscription:subscription.id}));
        // put(`/subscriptions/${subscription.id}`);
    };

    return (
        <VerticalLayout {...props}>
            <div>
                <h1>Edit Subscription</h1>
                <form onSubmit={handleSubmit}>
                    {/* Similar fields as CreateSubscription */}

                    <button type="submit">Update Subscription</button>
                </form>
            </div>
        </VerticalLayout>
    );
};

export default EditSubscription;
