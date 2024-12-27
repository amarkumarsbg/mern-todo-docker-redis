# MERN Docker Project

This is a MERN stack project with Docker setup. It includes a MongoDB database, a backend service running on Node.js, and a frontend using React.

## Prerequisites

- Docker and Docker Compose must be installed on the system.

## Setup Instructions

1. **Clone the repository** (if it's on GitHub or GitLab):
   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. **Build and Start the Docker Containers**:
   Run the following command in the root of the project:
   ```bash
   docker-compose up --build
   ```

3. **Access the Application**:
   - The frontend will be accessible at `http://localhost:5173`
   - The backend will be accessible at `http://localhost:8000`

4. **Stop the Containers**:
   To stop the containers, run:
   ```bash
   docker-compose down
   ```

5. **Environment Variables**:
   If the project uses any `.env` files, make sure to create or configure them as necessary.
