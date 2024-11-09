// manager.js
const express = require('express');
const router = express.Router();

// Update maintenance request status, priority, or comment (Manager use case)
router.put('/maintenance-requests/:id', (req, res) => {
    const db = req.db; // Use db from request
    const requestId = req.params.id;
    const { status, priority, comment } = req.body;
    const updated_at = new Date().toISOString();

    console.log('Received PUT request to update maintenance request:', requestId);
    console.log('Request body:', req.body);

    // Base SQL query
    let query = 'UPDATE maintenance_requests SET updated_at = ?';
    let params = [updated_at];

    // Add conditions based on what was provided in the request
    if (status) {
        query += ', status = ?';
        params.push(status);
    }
    if (priority) {
        query += ', priority = ?';
        params.push(priority);
    }
    if (comment) {
        query += ', comment = ?';
        params.push(comment);
    }

    // Ensure we have at least one field to update before executing the query
    if (params.length === 1) {
        return res.status(400).json({ error: 'No fields provided to update.' });
    }

    query += ' WHERE id = ?';
    params.push(requestId);

    console.log('Final SQL query:', query);
    console.log('Query parameters:', params);

    // Run the update query
    db.run(query, params, function (err) {
        if (err) {
            console.error('Error updating maintenance request:', err.message);
            res.status(400).json({ error: err.message });
        } else if (this.changes === 0) {
            console.warn('No maintenance request found with id:', requestId);
            res.status(404).json({ error: 'Maintenance request not found.' });
        } else {
            console.log('Maintenance request updated successfully:', requestId);
            res.json({ message: 'Request updated successfully', changes: this.changes });
        }
    });
});

module.exports = router;
