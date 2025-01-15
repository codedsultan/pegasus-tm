import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

const CreatePlan = () => {
    const { data, setData, post, errors, reset } = useForm({
        name: '',
        description: '',
        price: '',
        billing_cycle: '',
        status: 'active',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/plans', {
            onSuccess: () => reset(),
        });
    };

    return (
        <div>
            <h1>Create Plan</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="input"
                    />
                    {errors.name && <div className="error">{errors.name}</div>}
                </div>

                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className="textarea"
                    ></textarea>
                    {errors.description && <div className="error">{errors.description}</div>}
                </div>

                <div>
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        id="price"
                        value={data.price}
                        onChange={(e) => setData('price', e.target.value)}
                        className="input"
                    />
                    {errors.price && <div className="error">{errors.price}</div>}
                </div>

                <div>
                    <label htmlFor="billing_cycle">Billing Cycle (months)</label>
                    <input
                        type="number"
                        id="billing_cycle"
                        value={data.billing_cycle}
                        onChange={(e) => setData('billing_cycle', e.target.value)}
                        className="input"
                    />
                    {errors.billing_cycle && <div className="error">{errors.billing_cycle}</div>}
                </div>

                <div>
                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        value={data.status}
                        onChange={(e) => setData('status', e.target.value)}
                        className="select"
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                    {errors.status && <div className="error">{errors.status}</div>}
                </div>

                <button type="submit" className="btn btn-primary">
                    Create Plan
                </button>
            </form>
        </div>
    );
};

export default CreatePlan;
