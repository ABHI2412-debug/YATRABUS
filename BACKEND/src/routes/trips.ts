import { Router } from 'express';
import { prisma } from '../prisma';

const router = Router();

// GET all trips for admin
router.get('/', async (req, res) => {
  try {
    const trips = await prisma.trip.findMany({
      include: {
        bus: true,
        route: true,
        bookings: {
          include: {
            user: true
          }
        }
      },
      orderBy: {
        departureDatetime: 'desc'
      }
    });
    res.json(trips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch trips' });
  }
});

// GET single trip with seats info
router.get('/:id/seats', async (req, res) => {
  try {
    const tripId = req.params.id;
    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: {
        bus: true,
        route: true,
        bookings: {
          include: { user: true }
        }
      }
    });
    
    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    res.json(trip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch trip seats' });
  }
});

export default router;
