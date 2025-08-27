# NestJS + React Project

This project provides a full-stack application with a NestJS backend and React frontend.

## Project Structure

- `backend/`: Contains the NestJS backend application
- `frontend/`: Contains the React frontend application

## Setup Instructions

### Backend Setup
1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Copy/Replace .env.example into .env file:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run start
```

The backend will be available at `http://localhost:3000`

### Testing
Start the test:
```bash
npm run test
```

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Copy/Replace .env.example into .env file:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm start
```

The frontend will be available at `http://localhost:3001`

### Testing
Start the test:
```bash
npm run test
```

## Running Both Applications
To run both backend and frontend concurrently:
1. Open two terminal windows
2. Run backend in first terminal: `cd backend && npm run start`
3. Run frontend in second terminal: `cd frontend && npm start`

You can then access:
- Backend API: http://localhost:3000
- Frontend UI: http://localhost:3001
