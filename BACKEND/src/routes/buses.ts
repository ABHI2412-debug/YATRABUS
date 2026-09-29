import { Router } from 'express';
import { prisma } from '../prisma';
import { authenticateJWT, isAdmin } from '../middleware/auth';

const router = Router();

// GET all active buses
router.get('/', async (req, res) => {
  try {
    const buses = await prisma.bus.findMany({
      where: {
        status: 'Active'
      },
      orderBy: {
        plateNumber: 'asc'
      }
    });
    res.json(buses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch buses' });
  }
});

// GET /api/buses/search - Return real search results from DB
router.get('/search', async (req, res) => {
  try {
    const { from, to, date, category, timeSlots, minRating } = req.query;

    const trips = await prisma.trip.findMany({
      include: {
        bus: true,
        route: true
      }
    });

    // Format DB trips to match frontend expectations
    let mapped = trips.map(t => {
      // Calculate duration
      const durationMs = new Date(t.arrivalDatetime).getTime() - new Date(t.departureDatetime).getTime();
      const h = Math.floor(durationMs / 3600000);
      const m = Math.floor((durationMs % 3600000) / 60000);

      // Extract time
      const depDate = new Date(t.departureDatetime);
      const arrDate = new Date(t.arrivalDatetime);
      
      const formatTime = (d: Date) => d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });
      const depTime = formatTime(depDate);
      
      // Determine timeSlot based on departure hour
      const hour = depDate.getHours();
      let slot = 'morning';
      if (hour >= 12 && hour < 17) slot = 'afternoon';
      if (hour >= 17 && hour < 21) slot = 'evening';
      if (hour >= 21 || hour < 5) slot = 'night';

      return {
        id: t.id,
        operator: t.bus.busStyle === 'sleeper' ? 'VRL Travels & Logistics' : 'Purple Metrolink', // mocked operator
        rating: (4.0 + Math.random()).toFixed(1), // mock rating
        reviews: Math.floor(Math.random() * 2000).toString(),
        busType: t.bus.type,
        busPlate: t.bus.plateNumber,
        badge: 'Verified',
        rawDepDate: t.departureDatetime,
        depTime: depTime,
        depLocation: `Terminal, ${t.route.originCity}`,
        duration: `${h}h ${m}m`,
        arrTime: formatTime(arrDate),
        arrLocation: `Dropoff, ${t.route.destinationCity}`,
        routeVia: t.route.waypoints.join(', ') || 'Direct Highway',
        seatsLeft: Math.floor(Math.random() * t.bus.totalSeats) + 1, // mocked for now
        price: Number(t.baseFare),
        category: t.bus.busStyle || 'seater',
        timeSlot: slot,
        amenities: Object.keys(t.bus.amenities as any).filter(k => (t.bus.amenities as any)[k])
      };
    });
    
    if (from) mapped = mapped.filter(b => b.depLocation.toLowerCase().includes(String(from).toLowerCase()));
    if (to) mapped = mapped.filter(b => b.arrLocation.toLowerCase().includes(String(to).toLowerCase()));

    if (date) {
      const targetDate = new Date(String(date)).toDateString();
      if (targetDate !== 'Invalid Date') {
        mapped = mapped.filter(b => new Date(b.rawDepDate).toDateString() === targetDate);
      }
    }

    if (category && category !== 'all') {
      mapped = mapped.filter(b => b.category === category);
    }
    
    if (timeSlots && typeof timeSlots === 'string' && timeSlots.length > 0) {
      const slots = timeSlots.split(',');
      mapped = mapped.filter(b => slots.includes(b.timeSlot));
    }

    if (minRating) {
      mapped = mapped.filter(b => parseFloat(b.rating) >= parseFloat(minRating as string));
    }

    res.json(mapped);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to search buses' });
  }
});

// POST to create a new bus (admin only ideally)
router.post('/', authenticateJWT, isAdmin, async (req, res) => {
  try {
    const { plateNumber, type, totalSeats, amenities, busStyle } = req.body;
    
    const newBus = await prisma.bus.create({
      data: {
        plateNumber,
        type,
        totalSeats,
        amenities,
        busStyle
      }
    });
    
    res.status(201).json(newBus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create bus' });
  }
});

export default router;
