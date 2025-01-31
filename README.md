## Project structure

### Backend

- [**`src/controllers/`**](backend/src/controllers/): Contains the Logic for handling API requests
- [**`src/models/`**](backend/src/models/): Defines MongoDB schema for URLs
- [**`src/routes/`**](backend/src/routes/): Defines the API routes
- [**`src/middlewares/`**](backend/src/middlewares/): Middleware functions (e.g., rate limiting)
- [**`src/utils/`**](backend/src/utils/): Contains utility functions
- [**`src/server.ts`**](backend/src/server.ts): Entry point for the backend server
- [**`src/config.json`**](backend/src/config/config.json): Config file (e.g., rate limit value, time window)

### Frontend

- [**`src/components/`**](frontend/src/components/): Contains React components
- [**`src/components/__tests__`**](frontend/src/components/__tests__/): Contains Tests for React components
- [**`src/hooks/`**](frontend/src/hooks/): Custom React hooks
- [**`src/utils/`**](frontend/src/utils/): Contains utility functions
- [**`src/App.tsx`**](frontend/src/App.tsx): Main application component
- [**`src/main.tsx`**](frontend/src/main.tsx): Entry point for the frontend

## Setup instructions

1. Install dependencies:

   ```bash
   npm install
   cd backend && npm install
   cd ../frontend && npm install
   ```

2. Start the development server:

| Service       | Command                      | Description                                            |
| ------------- | ---------------------------- | ------------------------------------------------------ |
| Backend Only  | `cd backend && npm run dev`  | starts express server in development mode on port 5000 |
| Frontend Only | `cd frontend && npm run dev` | starts Vite dev server for the frontend on port 5173   |
| Both Services | `npm run start`              | Concurrently starts both frontend and backend          |

3. Access the frontend:
   ```
   http://localhost:5173
   ```

## Testing

Run tests for both backend and frontend:

```bash
npm run test
```

Or, separately

1. Backend

```bash
cd backend
npm run test
```

2. Frontend

```bash
cd frontend
npm run test
```
