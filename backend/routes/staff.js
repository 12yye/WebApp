// staff.js
const express = require('express');
const router = express.Router();

// Get all maintenance requests for staff
router.get('/maintenance-requests', (req, res) => {
    const db = req.db; // Use db from request

    db.all('SELECT * FROM maintenance_requests', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// Update the status of a maintenance request (Staff use case)
router.put('/maintenance-requests/:id', (req, res) => {
    const db = req.db; // Use db from request
    const requestId = req.params.id;
    const { status, comment } = req.body;

    db.run(
        `UPDATE maintenance_requests SET status = ?, comment = ? WHERE id = ?`,
        [status, comment, requestId],
        function (err) {
            if (err) {
                res.status(400).json({ error: err.message });
            } else {
                res.json({ updated: this.changes });
            }
        }
    );
});

module.exports = router;
