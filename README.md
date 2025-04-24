# Frontend Developer Assignment | Digital Pylot

This is a coding assignment for a frontend developer role. The project consists of a backend API built with Express.js and PostgreSQL.

## Project Structure

```
.
├── backend/             # Backend Express.js application
│   ├── src/            # Source code
│   │   ├── index.js    # Main application file
│   │   └── db.js       # Database connection
│   └── Dockerfile      # Backend container configuration
├── db/                 # Database files
│   └── data.sql       # Database schema and initial data
└── docker-compose.yml  # Docker compose configuration
```

## Getting Started

### Prerequisites

- Docker. Get it from [https://docs.docker.com/get-started/get-docker/](https://docs.docker.com/get-started/get-docker/).
- Docker Compose. (Comes with Docker Desktop)

### Running the Project

1. Clone this repository
2. Run the following command in the project root:

```bash
docker-compose up --build
```

This will:

- Start the PostgreSQL database
- Initialize the database with the schema and sample data
- Start the Express.js backend server (available at `http://localhost:3000`)
- Start the Next.js frontend development server (available at `http://localhost:3001`)

## API Endpoints

### Users

- `GET /api/users` - Get all users (with pagination)
  - Query parameters:
    - `page` (default: 1)
    - `limit` (default: 10)
- `GET /api/users/:id` - Get a single user

## Your Task

- Fetch the data from the backend API and display it in the frontend.
- Use the Figma design as a reference to style the frontend.
- Your implementation should look, and function as closely as possible to the design.

[Figma Design](https://www.figma.com/design/if5qWifjxeccbqNMc4hxUU/Table.-Interview?t=IJKZaS3zZWJdJQRJ-0)
