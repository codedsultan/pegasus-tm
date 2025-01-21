import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import VerticalLayout from '../../../layouts/AdminVertical';
const CreateSubscription = () => {
    // const { plans , users } = usePage().props;
    const plans:any = usePage().props.plans;
    const users:any = usePage().props.users;
    const { data, setData, post, errors } = useForm({
        user_id: '',
        plan_id: '',
        started_at: '',
        ends_at: '',
    });

    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        post('/subscriptions');
    };

    const props: any = {
        title: 'Subscriptions',
        description: 'Create a new subscription',
    }

    return (
        <VerticalLayout {...props}>
            <div>
                <h1>Create Subscription</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="user_id">User</label>
                        <select
                            id="user_id"
                            value={data.user_id}
                            onChange={(e) => setData('user_id', e.target.value)}
                        >
                            <option value="">Select User</option>
                            {users.map((user:any) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                        {errors.user_id && <div>{errors.user_id}</div>}
                    </div>

                    <div>
                        <label htmlFor="plan_id">Plan</label>
                        <select
                            id="plan_id"
                            value={data.plan_id}
                            onChange={(e) => setData('plan_id', e.target.value)}
                        >
                            <option value="">Select Plan</option>
                            {plans.map((plan:any) => (
                                <option key={plan.id} value={plan.id}>
                                    {plan.name}
                                </option>
                            ))}
                        </select>
                        {errors.plan_id && <div>{errors.plan_id}</div>}
                    </div>

                    <div>
                        <label htmlFor="started_at">Start Date</label>
                        <input
                            type="date"
                            id="started_at"
                            value={data.started_at}
                            onChange={(e) => setData('started_at', e.target.value)}
                        />
                        {errors.started_at && <div>{errors.started_at}</div>}
                    </div>

                    <div>
                        <label htmlFor="ends_at">End Date</label>
                        <input
                            type="date"
                            id="ends_at"
                            value={data.ends_at}
                            onChange={(e) => setData('ends_at', e.target.value)}
                        />
                        {errors.ends_at && <div>{errors.ends_at}</div>}
                    </div>

                    <button type="submit">Create Subscription</button>
                </form>
            </div>
        </VerticalLayout>
    );
};

export default CreateSubscription;
