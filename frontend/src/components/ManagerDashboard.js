import React, { useEffect, useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5001';

const ManagerDashboard = () => {
    const [tenants, setTenants] = useState([]);
    const [requests, setRequests] = useState([]);
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [apartment, setApartment] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');

    useEffect(() => {
        // Fetch tenants and maintenance requests from backend
        fetchTenants();
        fetchRequests();
    }, []);

    const fetchTenants = async () => {
        try {
            const response = await axios.get('/api/tenants');
            setTenants(response.data);
        } catch (error) {
            console.error('Error fetching tenants:', error);
            alert('Failed to fetch tenants. Please try again later.');
        }
    };

    const fetchRequests = async () => {
        try {
            const response = await axios.get('/api/maintenance-requests');
            setRequests(response.data);
        } catch (error) {
            console.error('Error fetching requests:', error);
            alert('Failed to fetch requests. Please try again later.');
        }
    };

    // Handle Adding a New Tenant
    const handleAddTenant = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/tenants', {
                name,
                phoneNumber,
                email,
                apartment,
                checkInDate,
                checkOutDate,
            });
            alert('Tenant added successfully!');
            fetchTenants();
        } catch (error) {
            console.error('Error adding tenant:', error);
            alert('Failed to add tenant. Please try again.');
        }
    };

    // Handle Deleting a Tenant
    const handleDeleteTenant = async (tenantId) => {
        try {
            await axios.delete(`/api/tenants/${tenantId}`);
            alert('Tenant deleted successfully!');
            fetchTenants();
        } catch (error) {
            console.error('Error deleting tenant:', error);
            alert('Failed to delete tenant. Please try again.');
        }
    };

    // Handle Updating Maintenance Request Status
    // Handle Updating Maintenance Request Status
    const handleUpdateRequestStatus = async (requestId, status) => {
        const comment = prompt('Add any comments (optional):');
        const requestData = {
            status: status,
        };

        if (comment) {
            requestData.comment = comment; // Include comment if provided
        }

        console.log('Attempting to send PUT request with data:', requestData); // Log for debugging

        try {
            const response = await axios.put(`/api/maintenance-requests/${requestId}`, requestData);
            console.log('Response from server:', response.data); // Log the server response
            alert('Request status updated!');
            fetchRequests();
        } catch (error) {
            console.error('Error updating request status:', error.response ? error.response.data : error.message);
            alert('Failed to update request status. Please try again.');
        }
    };

// Handle Setting Priority of Maintenance Request
    const handleSetPriority = async (requestId) => {
        let priority = prompt('Enter priority (Low, Medium, High):');
        priority = priority ? priority.toLowerCase() : null;

        // Validate the entered priority
        if (priority && ['low', 'medium', 'high'].includes(priority)) {
            const priorityFormatted = priority.charAt(0).toUpperCase() + priority.slice(1);
            console.log('Attempting to set priority with PUT request:', { priority: priorityFormatted }); // Log for debugging

            try {
                const response = await axios.put(`/api/maintenance-requests/${requestId}`, { priority: priorityFormatted });
                console.log('Response from server:', response.data); // Log the server response
                alert('Request priority updated!');
                fetchRequests();
            } catch (error) {
                console.error('Error setting request priority:', error.response ? error.response.data : error.message);
                alert('Failed to update priority. Please try again.');
            }
        } else {
            alert('Invalid priority entered. Please enter Low, Medium, or High.');
        }
    };

    // Handle Deleting a Maintenance Request
    const handleDeleteRequest = async (requestId) => {
        try {
            await axios.delete(`/api/maintenance-requests/${requestId}`);
            alert('Request deleted successfully!');
            fetchRequests();
        } catch (error) {
            console.error('Error deleting request:', error);
            alert('Failed to delete request. Please try again.');
        }
    };

    return (
        <div className="manager-dashboard">
            <h2>Manager Dashboard</h2>

            {/* Add Tenant Form */}
            <form onSubmit={handleAddTenant}>
                <h3>Add New Tenant</h3>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Phone Number:</label>
                    <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Apartment Number:</label>
                    <input type="text" value={apartment} onChange={(e) => setApartment(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Check-In Date:</label>
                    <input type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Check-Out Date (Optional):</label>
                    <input type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} />
                </div>
                <button type="submit">Add Tenant</button>
            </form>

            {/* List of Tenants */}
            <h3>Existing Tenants</h3>
            <ul>
                {tenants.map((tenant) => (
                    <li key={tenant.id}>
                        {tenant.name} - {tenant.apartment}
                        <button onClick={() => handleDeleteTenant(tenant.id)}>Delete Tenant</button>
                    </li>
                ))}
            </ul>

            {/* List of Maintenance Requests */}
            <h3>Maintenance Requests</h3>
            <ul>
                {requests.map((request) => (
                    <li key={request.id}>
                        {request.description} - Status: {request.status} - Priority: {request.priority || 'None'}
                        <button onClick={() => handleUpdateRequestStatus(request.id, 'completed')}>Mark as Completed</button>
                        <button onClick={() => handleDeleteRequest(request.id)}>Delete Request</button>
                        <button onClick={() => handleSetPriority(request.id)}>Set Priority</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManagerDashboard;
