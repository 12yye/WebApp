// maintenance.js
const express = require('express');
const router = express.Router();

// Get all maintenance requests (Staff and Manager use case)
router.get('/', (req, res) => {
    const db = req.db; // Use db from request

    db.all('SELECT * FROM maintenance_requests', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// Get maintenance requests for a specific tenant (for Tenant Dashboard)
router.get('/my', (req, res) => {
    const db = req.db; // Use db from request
    const { tenant_id } = req.query;

    db.all('SELECT * FROM maintenance_requests WHERE tenant_id = ?', [tenant_id], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// Add a new maintenance request (Tenant use case)
router.post('/', (req, res) => {
    const db = req.db; // Use db from request
    const { tenant_id, area, description, photo, priority } = req.body;
    const created_at = new Date().toISOString();

    db.run(
        `INSERT INTO maintenance_requests (tenant_id, area, description, photo, priority, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
        [tenant_id, area, description, photo, priority, created_at],
        function (err) {
            if (err) {
                res.status(400).json({ error: err.message });
            } else {
                res.json({ requestId: this.lastID });
            }
        }
    );
});

// Update maintenance request status, priority, or comment (Manager and Staff use case)
router.put('/:id', (req, res) => {
    const db = req.db; // Use db from request
    const { id } = req.params;
    const { status, comment, priority } = req.body;
    const updated_at = new Date().toISOString();

    let query = 'UPDATE maintenance_requests SET updated_at = ?';
    let params = [updated_at];

    if (status) {
        query += ', status = ?';
        params.push(status);
    }
    if (comment) {
        query += ', comment = ?';
        params.push(comment);
    }
    if (priority) {
        query += ', priority = ?';
        params.push(priority);
    }

    query += ' WHERE id = ?';
    params.push(id);

    db.run(query, params, function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
        } else {
            res.json({ message: 'Request updated successfully', changes: this.changes });
        }
    });
});

// Delete a maintenance request (Manager use case)
router.delete('/:id', (req, res) => {
    const db = req.db; // Use db from request
    const { id } = req.params;

    db.run('DELETE FROM maintenance_requests WHERE id = ?', [id], function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
        } else {
            res.json({ message: 'Request deleted successfully', changes: this.changes });
        }
    });
});

module.exports = router;
