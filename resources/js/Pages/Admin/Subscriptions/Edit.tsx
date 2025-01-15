import React from 'react';
import { useForm, usePage } from '@inertiajs/react';

const EditSubscription = () => {
    const subscription:any = usePage().props.subscription;
    const plans:any = usePage().props.plans;
    const users:any = usePage().props.users;
    const { data, setData, put, errors } = useForm({
        user_id: subscription.user_id,
        plan_id: subscription.plan_id,
        started_at: subscription.started_at,
        ends_at: subscription.ends_at,
        status: subscription.status,
    });

    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        put(`/subscriptions/${subscription.id}`);
    };

    return (
        <div>
            <h1>Edit Subscription</h1>
            <form onSubmit={handleSubmit}>
                {/* Similar fields as CreateSubscription */}
                <button type="submit">Update Subscription</button>
            </form>
        </div>
    );
};

export default EditSubscription;
