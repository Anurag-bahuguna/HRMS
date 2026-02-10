import React, { useState } from 'react';
import EmployeeList from '../components/EmployeeList';
import AddEmployeeForm from '../components/AddEmployeeForm';

const Employees = () => {
    const [refreshKey, setRefreshKey] = useState(0);

    const handleEmployeeAdded = () => {
        setRefreshKey(oldKey => oldKey + 1);
    };

    return (
        <div className="page-container">
            <h1>Employee Management</h1>
            <div className="content-grid">
                <div className="section-add">
                    <AddEmployeeForm onEmployeeAdded={handleEmployeeAdded} />
                </div>
                <div className="section-list">
                    {/* Key prop forces re-mount which re-fetches data */}
                    <EmployeeList key={refreshKey} />
                </div>
            </div>
        </div>
    );
};

export default Employees;
