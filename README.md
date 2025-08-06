# Online Code Editor

This project is an online code editor with a backend for code compilation and a frontend for the user interface.

## Project Structure

The project is divided into two main parts:

- `code-compiler-backend`: Contains the Node.js backend for handling code compilation requests.
- `code-compiler-frontend`: Contains the React.js frontend for the user interface.

## Setup and Installation

To set up and run this project, follow these steps:

### Backend Setup

1. Navigate to the `code-compiler-backend` directory:
   ```bash
   cd code-compiler-backend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `code-compiler-backend` directory and add necessary environment variables (e.g., database connection string, port).
4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the `code-compiler-frontend` directory:
   ```bash
   cd code-compiler-frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm start
   ```

## Usage

Once both the backend and frontend servers are running, you can access the online code editor in your web browser, typically at `http://localhost:3000` (or whatever port your frontend is configured to run on).