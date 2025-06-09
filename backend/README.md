# ToDo FullStack Application

This project is a full-stack ToDo application that uses MongoDB Atlas for data storage and Express.js for the backend API. It allows users to register, log in, and manage their tasks.

## Project Structure

```
registration-backend
├── src
│   ├── app.js             # Entry point of the application
│   ├── models
│   │   ├── user.js        # User model for MongoDB
│   │   └── task.js        # Task model for MongoDB
│   ├── routes
│   │   ├── auth.js        # Routes for user authentication
│   │   └── tasks.js       # Routes for task management
│   └── utils
│       └── db.js          # Database connection logic for MongoDB Atlas
├── package.json            # npm configuration file
└── README.md               # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd registration-backend
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Set up your MongoDB Atlas account and create a new cluster. Obtain your connection string.

5. Create a `.env` file in the root directory and add your MongoDB connection string:
   ```
   MONGODB_URI=<your-mongodb-connection-string>
   ```

## Usage

1. Start the application:
   ```
   npm start
   ```

2. The server will run on `http://localhost:8625`.

## API Endpoints

### Authentication

- **POST /register**: Register a new user.
- **POST /login**: Log in an existing user.

### Task Management

- **GET /tasks**: Retrieve all tasks.
- **POST /tasks**: Create a new task.
- **PUT /tasks/:id**: Update an existing task.
- **DELETE /tasks/:id**: Delete a task.

## License

This project is licensed under the MIT License.