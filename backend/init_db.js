const sqlite3 = require('sqlite3').verbose();

// Open the database connection
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Error connecting to the SQLite database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// SQL to create `tenants` table
const createTenantsTable = `
CREATE TABLE IF NOT EXISTS tenants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phoneNumber TEXT NOT NULL,
    email TEXT NOT NULL,
    apartment TEXT NOT NULL,
    checkInDate TEXT NOT NULL,
    checkOutDate TEXT
);
`;

// SQL to create `maintenance_requests` table
const createRequestsTable = `
CREATE TABLE IF NOT EXISTS maintenance_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tenant_id INTEGER NOT NULL,
    area TEXT NOT NULL,
    description TEXT NOT NULL,
    photo TEXT,
    priority TEXT DEFAULT 'Low',
    status TEXT DEFAULT 'pending',
    comment TEXT,
    created_at TEXT NOT NULL,
    FOREIGN KEY (tenant_id) REFERENCES tenants (id)
);
`;

// Execute the SQL to create the tables
db.serialize(() => {
    db.run(createTenantsTable, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Created `tenants` table.');
    });

    db.run(createRequestsTable, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Created `maintenance_requests` table.');
    });
});

// Close the database connection
db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Closed the database connection.');
});
