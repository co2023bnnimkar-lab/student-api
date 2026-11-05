# Student Net

Student Net is a Student Information Management API built with Node.js, Express, and MongoDB Atlas.

## Run with Docker

### Prerequisites

- Docker Desktop (or Docker Engine)
- A MongoDB Atlas connection string

### 1. Configure environment variables

Copy the example file:

```bash
cp .env.example .env
```

Open `.env` and replace the `MONGODB_URI` placeholder with your MongoDB Atlas connection string. Set `FRONTEND_URL` to the origin of your frontend. Do not commit the real `.env` file.

### 2. Build and start the container

```bash
docker compose up --build -d
```

The Student Net API will be available at:

- Health/root endpoint: http://localhost:5000/
- Student endpoints: http://localhost:5000/api/students

### 3. Check logs and container status

```bash
docker compose logs -f student-net
docker compose ps
```

### 4. Stop the container

```bash
docker compose down
```

To rebuild after changing application code:

```bash
docker compose up --build -d
```

## Run without Docker

```bash
npm install
npm start
```

Create a local `.env` file with at least `MONGODB_URI` and, if needed, `FRONTEND_URL`.
