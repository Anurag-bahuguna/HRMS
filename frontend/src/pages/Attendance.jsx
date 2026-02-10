import React, { useState } from 'react';
import AttendanceForm from '../components/AttendanceForm';
import AttendanceView from '../components/AttendanceList';

const Attendance = () => {
    return (
        <div className="page-container">
            <h1>Attendance Management</h1>
            <div className="content-grid">
                <div className="section-mark">
                    <AttendanceForm />
                </div>
                <div className="section-view">
                    <AttendanceView />
                </div>
            </div>
        </div>
    );
};

export default Attendance;
