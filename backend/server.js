// server.js

const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = process.env.PORT || 5001; // Using port 5001 for backend server

// CORS Configuration
app.use(cors({
    origin: 'http://localhost:3000', // Assuming your frontend runs on port 3000
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Explicitly state allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Explicitly state allowed headers
    credentials: true // Allow credentials to be included if needed
}));

app.use(express.json());  // This is critical to parse JSON body

// Logging middleware for debugging requests and request body
app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    if (Object.keys(req.body).length) {
        console.log('Request body:', req.body);
    }
    next();
});

// Initialize SQLite Database
let db;
try {
    db = new sqlite3.Database('./database.db', (err) => {
        if (err) {
            console.error('Error opening database:', err.message);
        } else {
            console.log('Connected to SQLite database.');
        }
    });
} catch (error) {
    console.error('Failed to initialize SQLite database:', error.message);
}

// Middleware to attach `db` to all requests
app.use((req, res, next) => {
    req.db = db; // Attach the db instance to the request object
    next();
});

// Sample root route to test server
app.get('/', (req, res) => {
    res.send('Backend server is running.');
});

// Maintenance requests routes
const maintenanceRouter = require('./routes/maintenance');
app.use('/api/maintenance-requests', maintenanceRouter);

// Tenant routes (for adding and deleting tenants)
const tenantRouter = require('./routes/tenants');
app.use('/api/tenants', tenantRouter);

// Manager routes
const managerRouter = require('./routes/manager');
app.use('/api/manager', managerRouter);

// Staff routes
const staffRouter = require('./routes/staff');
app.use('/api/staff', staffRouter);

// Listen on the specified port
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
