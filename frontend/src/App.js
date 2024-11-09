import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import TenantDashboard from './components/TenantDashboard';
import StaffDashboard from './components/StaffDashboard';
import ManagerDashboard from './components/ManagerDashboard';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/tenant-dashboard" element={<TenantDashboard />} />
                <Route path="/staff-dashboard" element={<StaffDashboard />} />
                <Route path="/manager-dashboard" element={<ManagerDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
