import React, { useState, useEffect } from 'react';
import { getEmployees, getAttendance } from '../services/api';

const AttendanceView = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchEmployees = async () => {
            const response = await getEmployees();
            setEmployees(response.data);
        };
        fetchEmployees();
    }, []);

    const handleEmployeeChange = async (e) => {
        const empId = e.target.value;
        setSelectedEmployee(empId);
        if (empId) {
            setLoading(true);
            try {
                const response = await getAttendance(empId);
                setRecords(response.data);
            } catch (err) {
                console.error("Error fetching attendance");
            }
            setLoading(false);
        } else {
            setRecords([]);
        }
    };

    return (
        <div className="attendance-view">
            <h3>View Attendance Records</h3>
            <div className="form-group">
                <label>Select Employee: </label>
                <select value={selectedEmployee} onChange={handleEmployeeChange}>
                    <option value="">-- Select --</option>
                    {employees.map((emp) => (
                        <option key={emp.id} value={emp.id}>{emp.full_name}</option>
                    ))}
                </select>
            </div>

            {loading ? <p>Loading records...</p> : (
                selectedEmployee && (
                    <div className="records-table">
                        {records.length === 0 ? <p>No records found.</p> : (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {records.map((rec) => (
                                        <tr key={rec.id} className={`status-${rec.status.toLowerCase()}`}>
                                            <td>{rec.date}</td>
                                            <td>{rec.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )
            )}
        </div>
    );
};

export default AttendanceView;
