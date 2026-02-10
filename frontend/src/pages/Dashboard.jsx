import React, { useEffect, useState } from 'react';
import { getEmployees } from '../services/api';

const Dashboard = () => {
    const [employeeCount, setEmployeeCount] = useState(0);

    useEffect(() => {
        // Fetch employees to get count
        getEmployees().then(res => {
            setEmployeeCount(res.data.length);
        }).catch(err => console.error(err));
    }, []);

    return (
        <div className="dashboard">
            <h1>HRMS Lite Dashboard</h1>
            <div className="stats-cards">
                <div className="card">
                    <h3>Total Employees</h3>
                    <p className="stat-number">{employeeCount}</p>
                </div>
                <div className="card">
                    <h3>System Status</h3>
                    <p className="stat-text">Active</p>
                </div>
            </div>

            <div className="welcome-section">
                <p>Welcome to the HR Management System.</p>
                <p>Use the navigation bar to manage employees and attendance.</p>
            </div>
        </div>
    );
};

export default Dashboard;
