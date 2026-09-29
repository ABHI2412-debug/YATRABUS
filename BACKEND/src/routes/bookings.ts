import { Router } from 'express';
import crypto from 'crypto';
import { prisma } from '../prisma';
import { authenticateJWT, AuthRequest } from '../middleware/auth';

const router = Router();

// GET booked seats for a specific trip or bus
router.get('/seats', async (req, res) => {
  try {
    let tripId = req.query.tripId as string;
    const { busId } = req.query;

    if (!tripId && busId) {
      const trip = await prisma.trip.findFirst({
        where: { busId: String(busId) }
      });
      if (trip) tripId = trip.id;
    }

    if (!tripId) {
      return res.status(400).json({ error: 'tripId or busId is required' });
    }

    const bookings = await prisma.busBooking.findMany({
      where: {
        tripId: String(tripId),
        status: { in: ['Confirmed', 'Pending'] }
      }
    });

    let bookedSeatIds: string[] = [];
    bookings.forEach(b => {
      bookedSeatIds = [...bookedSeatIds, ...b.seatNumbers];
    });

    res.json({ bookedSeats: bookedSeatIds });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch booked seats' });
  }
});

// POST to create a new booking
router.post(['/', '/create'], authenticateJWT, async (req: AuthRequest, res) => {
  try {
    let { tripId, busId, selectedSeats, totalAmount } = req.body;
    
    let userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required to book seats' });
    }

    if (!tripId && busId) {
      const trip = await prisma.trip.findFirst({ where: { busId: String(busId) } });
      if (trip) tripId = trip.id;
    }

    if (!userId || !tripId || !selectedSeats || selectedSeats.length === 0) {
       return res.status(400).json({ error: 'Invalid booking data' });
    }

    // Verify trip exists
    const trip = await prisma.trip.findUnique({ where: { id: tripId } });
    if (!trip) {
       return res.status(404).json({ error: 'Trip not found' });
    }

    // Create the booking (using UUID instead of BK timestamp as per gap list)
    const crypto = require('crypto');
    const booking = await prisma.busBooking.create({
      data: {
        id: crypto.randomUUID(),
        userId: userId,
        tripId: tripId,
        seatNumbers: selectedSeats.map((s: any) => s.id || s), // Support both object and string array
        totalAmount: totalAmount,
        status: 'Confirmed'
      }
    });
    
    res.status(201).json({ success: true, booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// GET all bookings (Admin use)
router.get('/', async (req, res) => {
  try {
    // If we want to restrict to ADMIN, we could check req.user?.role
    // For now, let's just fetch all bookings
    const bookings = await prisma.busBooking.findMany({
      include: {
        user: true,
        trip: {
          include: {
            route: true
          }
        }
      },
      orderBy: { bookingDate: 'desc' }
    });
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

export default router;
