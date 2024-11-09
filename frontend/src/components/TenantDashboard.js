import React, { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5001';

const TenantDashboard = () => {
    const [area, setArea] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState(null);
    const [requests, setRequests] = useState([]);
    const [showHistory, setShowHistory] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Automatically determine priority based on keywords in the description
        let calculatedPriority = 'Low';
        if (description.toLowerCase().includes('leak') || description.toLowerCase().includes('broken')) {
            calculatedPriority = 'High';
        } else if (description.toLowerCase().includes('not working') || description.toLowerCase().includes('issue')) {
            calculatedPriority = 'Medium';
        }

        // Prepare data for the backend
        const formData = {
            tenant_id: 1, // Replace with dynamic tenant_id from logged-in user if available
            area,
            description,
            photo: photo ? photo.name : null, // Currently just sending the photo name
            priority: calculatedPriority,
        };

        try {
            // FIXED: Corrected URL to match backend route
            await axios.post('/api/maintenance-requests', formData);
            alert(`Request submitted successfully with priority: ${calculatedPriority}`);
            fetchRequests(); // Refresh requests list after submitting a new one
        } catch (error) {
            console.error('Error submitting maintenance request:', error);
            alert('Failed to submit request. Please try again later.');
        }
    };

    // Fetch the tenant's own requests history
    const fetchRequests = async () => {
        try {
            // FIXED: Corrected URL to match backend route
            const response = await axios.get('/api/maintenance-requests/my', { params: { tenant_id: 1 } });
            setRequests(response.data);
        } catch (error) {
            console.error('Error fetching maintenance requests:', error);
            alert('Failed to fetch maintenance requests history. Please try again later.');
        }
    };

    useEffect(() => {
        if (showHistory) {
            fetchRequests();
        }
    }, [showHistory]);

    return (
        <div className="tenant-dashboard">
            <h2>Submit a Maintenance Request</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Area of Problem:</label>
                    <select value={area} onChange={(e) => setArea(e.target.value)} required>
                        <option value="">Select an area</option>
                        <option value="kitchen">Kitchen</option>
                        <option value="bathroom">Bathroom</option>
                        <option value="bedroom">Bedroom</option>
                        <option value="living room">Living Room</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Upload Photo (optional):</label>
                    <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
                </div>
                <button type="submit">Submit Request</button>
            </form>

            <hr />

            <button onClick={() => setShowHistory(!showHistory)}>
                {showHistory ? 'Hide' : 'View'} Request History
            </button>

            {showHistory && (
                <div className="request-history">
                    <h3>Your Maintenance Requests History</h3>
                    {requests.length > 0 ? (
                        <ul>
                            {requests.map((request) => (
                                <li key={request.id}>
                                    {request.area} - {request.description} - Status: {request.status} - Priority: {request.priority || 'None'}
                                    {request.comment && <div><strong>Staff Comment:</strong> {request.comment}</div>}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No maintenance requests found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default TenantDashboard;
