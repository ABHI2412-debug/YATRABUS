import express, { Response } from 'express';
import { prisma } from '../prisma';
import { authenticateJWT, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Get User Profile
router.get('/profile', authenticateJWT, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, phone: true, role: true, createdAt: true }
    });
    
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get profile' });
  }
});

// Get User's Bookings
router.get('/my-bookings', authenticateJWT, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    
    const busBookings = await prisma.busBooking.findMany({
      where: { userId },
      include: {
        trip: {
          include: {
            route: true,
            bus: true
          }
        }
      },
      orderBy: { bookingDate: 'desc' }
    });

    const packageBookings = await prisma.packageBooking.findMany({
      where: { userId },
      include: {
        package: true
      }
    });

    res.json({ busBookings, packageBookings });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

export default router;
