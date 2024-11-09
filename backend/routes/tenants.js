// tenants.js
const express = require('express');
const router = express.Router();

// Add a new tenant (Manager use case)
router.post('/', (req, res) => {
    const db = req.db; // Use db from request instead of importing directly
    const { name, phoneNumber, email, apartment, checkInDate, checkOutDate } = req.body;

    db.run(
        `INSERT INTO tenants (name, phoneNumber, email, apartment, checkInDate, checkOutDate) VALUES (?, ?, ?, ?, ?, ?)`,
        [name, phoneNumber, email, apartment, checkInDate, checkOutDate],
        function (err) {
            if (err) {
                res.status(400).json({ error: err.message });
            } else {
                res.json({ tenantId: this.lastID });
            }
        }
    );
});

// Delete a tenant (Manager use case)
router.delete('/:id', (req, res) => {
    const db = req.db; // Use db from request instead of importing directly
    const { id } = req.params;

    db.run('DELETE FROM tenants WHERE id = ?', [id], function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
        } else {
            res.json({ message: 'Tenant deleted successfully', changes: this.changes });
        }
    });
});

// Get all tenants (Manager use case)
router.get('/', (req, res) => {
    const db = req.db; // Use db from request instead of importing directly

    db.all('SELECT * FROM tenants', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

module.exports = router;
