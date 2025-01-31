import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import urlRoutes from './routes/urlRoutes';
import { errorHandler } from './middlewares/errorHandler';
import swaggerSetup from './swagger/swagger';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Swagger docs
//swaggerSetup(app);

// connect to database
mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/', urlRoutes);

// Middleware handling error
app.use(errorHandler);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
export default app;