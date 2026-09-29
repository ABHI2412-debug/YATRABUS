import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import authRoutes from './routes/auth';
import busRoutes from './routes/buses';
import bookingRoutes from './routes/bookings';
import packageRoutes from './routes/packages';
import userRoutes from './routes/users';
import trackingRoutes from './routes/tracking';
import homepageRoutes from './routes/homepage';
import supportRoutes from './routes/support';
import offerRoutes from './routes/offers';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 requests per windowMs for auth
  message: { error: 'Too many requests from this IP, please try again after 15 minutes' }
});

// Routes
app.get('/', (req, res) => {
  res.send('YATRABUS API is running!');
});

// Modular Routes
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/buses', busRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tracking', trackingRoutes);
app.use('/api/homepage', homepageRoutes);
app.use('/api/support', supportRoutes);
app.use('/api/offers', offerRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
