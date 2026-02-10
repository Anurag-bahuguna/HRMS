import React, { useState, useEffect } from 'react';
import { getEmployees, markAttendance } from '../services/api';

const AttendanceForm = ({ onAttendanceMarked }) => {
    const [employees, setEmployees] = useState([]);
    const [attendance, setAttendance] = useState({
        employee_id: '',
        date: new Date().toISOString().split('T')[0],
        status: 'Present',
    });
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await getEmployees();
                setEmployees(response.data);
            } catch (err) {
                console.error("Failed to fetch employees");
            }
        };
        fetchEmployees();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAttendance({ ...attendance, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await markAttendance(attendance);
            setMessage({ type: 'success', text: 'Attendance marked successfully!' });
            if (onAttendanceMarked) onAttendanceMarked();
        } catch (err) {
            setMessage({ type: 'error', text: 'Failed to mark attendance.' });
        }
    };

    return (
        <div className="attendance-form">
            <h3>Mark Attendance</h3>
            {message && <div className={`message ${message.type}`}>{message.text}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Employee</label>
                    <select
                        name="employee_id"
                        value={attendance.employee_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Employee</option>
                        {employees.map((emp) => (
                            <option key={emp.id} value={emp.id}>
                                {emp.full_name} ({emp.department})
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Date</label>
                    <input
                        type="date"
                        name="date"
                        value={attendance.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <select
                        name="status"
                        value={attendance.status}
                        onChange={handleChange}
                    >
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                        <option value="Leave">Leave</option>
                    </select>
                </div>
                <button type="submit" className="btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default AttendanceForm;
