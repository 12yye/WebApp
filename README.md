# Maintenance Request Management System

This is a full-stack web application that helps property managers manage maintenance requests from tenants in an apartment rental business. It includes functionalities for tenants to submit requests, maintenance staff to update statuses, and managers to view and manage all maintenance activities.

## Features

- **Tenant Dashboard**: Submit maintenance requests, view the request history.
- **Manager Dashboard**: Add new tenants, delete tenants, update request status, and prioritize maintenance requests.
- **Staff Dashboard**: View and update maintenance requests.

## Technologies Used

- **Frontend**: React (JavaScript)
- **Backend**: Node.js, Express.js
- **Database**: SQLite

## Prerequisites

Before running the application, ensure you have the following installed on your system:

1. **Node.js & npm**: Required to run the backend server and frontend.
   - [Node.js download link](https://nodejs.org/en/download/)
2. **SQLite3**: Used for the database. The `sqlite3` library is required to interact with the SQLite database.
3. **React**: The frontend is built using React. You'll need to install React dependencies to get the frontend running.
4. **Axios**: Used for making API requests from the frontend.
5. **CORS**: Required to handle cross-origin requests.
6. **Express.js**: Used to create the backend server and handle routing.

## Installation Instructions

### Backend Setup

1. **Clone the repository**
   ```sh
   git clone <repository-url>
   cd <repository-folder>/backend
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

   This will install all the necessary packages, including Express.js, SQLite3, and CORS.

3. **Initialize the Database**
   Run the following command to create and initialize the SQLite database with the necessary tables:
   ```sh
   node init_db.js
   ```

4. **Start the Backend Server**
   ```sh
   node server.js
   ```

   The server will run on `http://localhost:5001` by default.

### Frontend Setup

1. **Navigate to the Frontend Directory**
   ```sh
   cd ../frontend
   ```

2. **Install React and Other Dependencies**
   ```sh
   npx create-react-app .
   npm install axios
   ```

   This will set up the React environment and install the Axios library to handle API requests.

3. **Start the Frontend Application**
   ```sh
   npm start
   ```

   This will start the React development server, which should run on `http://localhost:3000` by default.

### Install Additional Packages (Both Backend and Frontend)

In addition to the basic setup, you need to install the following packages for the complete functionality:

- **Backend**:
  ```sh
  npm install express cors sqlite3
  ```

- **Frontend**:
  ```sh
  npm install axios react-router-dom
  ```

These packages ensure that your application can handle routing, database operations, and cross-origin requests properly.

## Project Structure

```
|-- backend/
|   |-- routes/
|   |   |-- tenants.js
|   |   |-- maintenance.js
|   |   |-- manager.js
|   |-- server.js
|   |-- init_db.js
|-- frontend/
|   |-- src/
|   |   |-- components/
|   |   |   |-- TenantDashboard.js
|   |   |   |-- ManagerDashboard.js
|-- database.db
```

## Running the Application

1. Ensure that both the backend and frontend servers are running.
2. Open your browser and navigate to `http://localhost:3000` to use the frontend.
3. Use the manager dashboard to add tenants, or use the tenant dashboard to submit maintenance requests.

## API Endpoints

### Tenant Routes
- **POST /api/tenants**: Add a new tenant.
- **DELETE /api/tenants/:id**: Delete a tenant by their ID.
- **GET /api/tenants**: Get a list of all tenants.

### Maintenance Routes
- **POST /api/maintenance-requests**: Add a new maintenance request (tenant use case).
- **GET /api/maintenance-requests**: Get all maintenance requests (manager and staff use case).
- **GET /api/maintenance-requests/my**: Get maintenance requests for a specific tenant.
- **PUT /api/maintenance-requests/:id**: Update the status, priority, or comment of a maintenance request.
- **DELETE /api/maintenance-requests/:id**: Delete a maintenance request.

## Troubleshooting

- **Cannot GET /api/...**: This often means there is a typo in the route name or the backend server is not running.
- **CORS issues**: Ensure that the CORS configuration in `server.js` allows requests from `http://localhost:3000`.
- **Database Errors**: Ensure the SQLite database is properly initialized by running `node init_db.js` before starting the server.

## Known Issues

- **Priority Setting Not Working**: Ensure that the PUT request payload contains the correct fields (`status`, `priority`, or `comment`).
- **Photo Uploads**: Currently, only the photo name is being sent to the backend. To fully support photo uploads, implement an upload handler to save photos to the server.

## Future Improvements
- **Authentication**: Add user authentication to manage different roles like tenant, manager, and staff.
- **Photo Upload Handling**: Integrate photo handling for maintenance requests so that users can upload photos for each request.
- **Role-based Dashboards**: Expand functionalities for tenants, staff, and managers based on their roles.

## License

This project is open-source and available for modification and redistribution.

## Contact

For further queries, contact the repository owner or create an issue on GitHub.

---

Feel free to suggest any changes or improvements!

