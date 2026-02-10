import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">HRMS Lite</Link>
            </div>
            <div className="navbar-links">
                <Link to="/">Dashboard</Link>
                <Link to="/employees">Employees</Link>
                <Link to="/attendance">Attendance</Link>
            </div>
        </nav>
    );
};

export default Navbar;
