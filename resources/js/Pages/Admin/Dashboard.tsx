import React from 'react';
import { router } from '@inertiajs/react';


const Dashboard = () => {
    const handleLogout = () => {
        router.post('/admin/logout');
    };

    return (
        <div className="dashboard">
            <h1>Admin Dashboard</h1>
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 px-4 rounded"
            >
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
