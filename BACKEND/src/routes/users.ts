import express, { Request, Response } from 'express';
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

// Admin: Get All Users
router.get('/all', async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
        _count: {
          select: {
            busBookings: true,
            packageBookings: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const formattedUsers = users.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      phone: u.phone,
      role: u.role,
      status: 'Active',
      registered: u.createdAt,
      bookings: u._count.busBookings + u._count.packageBookings,
    }));

    res.json(formattedUsers);
  } catch (error: any) {
    console.error("Error fetching all users:", error);
    res.status(500).json({ error: 'Failed to fetch all users', details: error.message, stack: error.stack });
  }
});

export default router;
