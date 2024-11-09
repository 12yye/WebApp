import React, { useEffect, useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5001';

const StaffDashboard = () => {
    const [requests, setRequests] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await axios.get('/api/maintenance-requests');
            setRequests(response.data);
        } catch (error) {
            console.error('Error fetching requests:', error);
            alert('Failed to fetch maintenance requests. Please try again later.');
        }
    };

    const handleStatusUpdate = async (requestId) => {
        const comment = prompt('Add any comments when marking as complete (optional):');
        try {
            await axios.put(`/api/maintenance-requests/${requestId}`, { status: 'completed', comment });
            alert('Request status updated!');
            // Update the state to reflect the change in status
            setRequests(requests.map(req => req.id === requestId ? { ...req, status: 'completed', comment: comment } : req));
        } catch (error) {
            console.error('Error updating request status:', error);
            alert('Failed to update status. Please try again.');
        }
    };

    return (
        <div className="staff-dashboard">
            <h2>Maintenance Requests</h2>
            <input
                type="text"
                placeholder="Filter requests by area or status..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
            <ul>
                {requests
                    .filter(request => request.area.includes(filter) || request.status.includes(filter))
                    .map(request => (
                        <li key={request.id}>
                            {request.description} - Status: {request.status} - Priority: {request.priority || 'None'}
                            {request.status === 'pending' && (
                                <button onClick={() => handleStatusUpdate(request.id)}>Mark as Completed</button>
                            )}
                            {request.status === 'completed' && request.comment && (
                                <div><strong>Completion Comment:</strong> {request.comment}</div>
                            )}
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default StaffDashboard;
