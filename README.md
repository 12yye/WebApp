# Maintenance Request Management System

## Overview
This is a web-based Maintenance Request Management System for an apartment rental business. The system is designed to facilitate efficient communication between tenants, maintenance staff, and managers. It provides functionality for tenants to submit maintenance requests, managers to monitor and manage tenant accounts, and staff to handle assigned maintenance tasks. The entire application is built using a Node.js backend, SQLite for data storage, and React for the frontend.

## Features
- **Tenant Features**:
  - Submit maintenance requests with details such as area, description, and optional photos.
  - View the history of submitted maintenance requests, along with status and priority.

- **Manager Features**:
  - Add and manage tenant records.
  - Update the status, priority, and comments for maintenance requests.
  - Delete maintenance requests when necessary.

- **Staff Features**:
  - View all maintenance requests.
  - Update the status and comments of assigned maintenance tasks.

## Technologies Used
- **Backend**: Node.js with Express.js for building the RESTful API.
- **Database**: SQLite for data persistence.
- **Frontend**: React.js for building the user interface.
- **Other Libraries**:
  - **Axios** for HTTP requests between the frontend and backend.
  - **cors** for handling cross-origin requests.
  - **sqlite3** for interacting with the SQLite database.

## Installation Instructions
Follow the steps below to run the project locally.

### Prerequisites
- Node.js and npm installed.
- SQLite installed (optional but helpful for local database management).

### Setup Steps
1. **Clone the Repository**:
    ```bash
    git clone <repository-url>
    cd Maintenance-Request-Management-System
    ```

2. **Install Dependencies**:
    Navigate to both the backend and frontend directories and install the required packages:
    ```bash
    # Backend
    cd backend
    npm install

    # Frontend
    cd ../frontend
    npm install
    ```

3. **Database Initialization**:
    Initialize the SQLite database by running the `init_db.js` script from the backend directory:
    ```bash
    node init_db.js
    ```

4. **Run the Backend**:
    Start the backend server from the `backend` directory:
    ```bash
    npm start
    ```
    The backend will run on port `5001`.

5. **Run the Frontend**:
    Start the frontend server from the `frontend` directory:
    ```bash
    npm start
    ```
    The frontend will run on port `3000`.

6. **Access the Application**:
    Open a web browser and navigate to `http://localhost:3000`.

## Project Structure
The project is split into two main parts:
- **Backend (Node.js + Express)**: Located in the `backend` folder.
  - **server.js**: Sets up the Express server, initializes the database, and defines the routes.
  - **routes/**: Contains route handlers for tenants, maintenance requests, and other features.
- **Frontend (React.js)**: Located in the `frontend` folder.
  - **components/**: Contains React components like `ManagerDashboard`, `TenantDashboard`, etc.

## API Routes
- **/api/tenants**
  - `GET /api/tenants`: Fetch all tenants.
  - `POST /api/tenants`: Add a new tenant.
  - `DELETE /api/tenants/:id`: Delete a tenant by ID.

- **/api/maintenance-requests**
  - `GET /api/maintenance-requests`: Fetch all maintenance requests (Manager/Staff use).
  - `GET /api/maintenance-requests/my`: Fetch maintenance requests for a specific tenant.
  - `POST /api/maintenance-requests`: Add a new maintenance request (Tenant use).
  - `PUT /api/maintenance-requests/:id`: Update a maintenance request's status, priority, or comment.
  - `DELETE /api/maintenance-requests/:id`: Delete a maintenance request by ID.

## Notes
- **Database**: The project uses SQLite as a simple and lightweight database. The schema includes tables like `tenants` and `maintenance_requests` to manage the data efficiently.
- **User Flow**: Managers and staff have different levels of access and privileges compared to tenants. Ensure that the role-based access and functionality are properly managed.

## Troubleshooting
- **CORS Issues**: Make sure CORS is correctly configured in `server.js` for local development by ensuring the frontend's origin is allowed.
- **Port Conflicts**: Ensure no other services are using ports `3000` and `5001`.
- **Database Issues**: If you encounter `database.db` missing or tables not found, run the `init_db.js` script again to reinitialize.

## Contributing
1. **Fork the Repository**.
2. **Create a Feature Branch** (`git checkout -b feature/YourFeature`).
3. **Commit Changes** (`git commit -m 'Add some feature'`).
4. **Push to the Branch** (`git push origin feature/YourFeature`).
5. **Open a Pull Request**.

## License
This project is licensed under the MIT License. See the `LICENSE` file for more details.
