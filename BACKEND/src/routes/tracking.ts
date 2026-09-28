import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Get real-time or mocked tracking data for a specific trip
router.get('/:tripId', async (req, res) => {
  try {
    const { tripId } = req.params;

    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: {
        bus: true,
        route: true
      }
    });

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    // Mock live GPS tracking based on current time
    const now = new Date();
    const startTime = new Date(trip.departureDatetime).getTime();
    const endTime = new Date(trip.arrivalDatetime).getTime();
    const currentTime = now.getTime();

    let progress = 0;
    if (currentTime > startTime && currentTime < endTime) {
      progress = (currentTime - startTime) / (endTime - startTime);
    } else if (currentTime >= endTime) {
      progress = 1;
    }

    // Generate mock coordinates between origin and destination
    // For simplicity, we just return a progress percentage and some mock coordinates.
    const startCoord = { lat: 21.1458, lng: 79.0882 }; // Nagpur
    const endCoord = { lat: 18.5204, lng: 73.8567 };   // Pune

    const currentLat = startCoord.lat + (endCoord.lat - startCoord.lat) * progress;
    const currentLng = startCoord.lng + (endCoord.lng - startCoord.lng) * progress;

    const trackingData = {
      tripId,
      busPlateNumber: trip.bus.plateNumber,
      status: trip.status,
      progressPercentage: Math.round(progress * 100),
      currentLocation: {
        latitude: currentLat,
        longitude: currentLng,
      },
      estimatedArrival: trip.arrivalDatetime,
      lastUpdated: new Date()
    };

    res.json(trackingData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch tracking data' });
  }
});

export default router;
