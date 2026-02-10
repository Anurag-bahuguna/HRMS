import React, { useState } from 'react';
import { addEmployee } from '../services/api';

const AddEmployeeForm = ({ onEmployeeAdded }) => {
    const [employee, setEmployee] = useState({
        full_name: '',
        email: '',
        department: '',
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addEmployee(employee);
            onEmployeeAdded();
            setEmployee({ full_name: '', email: '', department: '' });
            setError(null);
        } catch (err) {
            setError('Failed to add employee. Email might be duplicate.');
        }
    };

    return (
        <div className="add-employee-form">
            <h3>Add New Employee</h3>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="full_name"
                        value={employee.full_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={employee.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Department</label>
                    <input
                        type="text"
                        name="department"
                        value={employee.department}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn-primary">Add Employee</button>
            </form>
        </div>
    );
};

export default AddEmployeeForm;
