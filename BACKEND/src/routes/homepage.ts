import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Get dynamic homepage content
router.get('/', async (req, res) => {
  try {
    // 1. Fetch Offers
    const offers = await prisma.offer.findMany({
      where: { isActive: true },
      take: 3,
      orderBy: { validUntil: 'desc' }
    });

    // 2. Fetch Popular Routes
    const popularRoutes = await prisma.route.findMany({
      take: 6,
      include: {
        _count: {
          select: { trips: true }
        }
      },
      orderBy: {
        trips: {
          _count: 'desc'
        }
      }
    });

    // 3. Featured Packages
    const featuredPackages = await prisma.tourPackage.findMany({
      where: { isActive: true },
      take: 3
    });

    // 4. Mock Testimonials (Since we don't have a Review model yet)
    const testimonials = [
      {
        id: 1,
        name: "Rahul Sharma",
        rating: 5,
        comment: "Excellent service! The bus was on time and very comfortable.",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      {
        id: 2,
        name: "Priya Patel",
        rating: 4,
        comment: "Smooth booking experience. Will definitely travel with YatrBus again.",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      {
        id: 3,
        name: "Amit Kumar",
        rating: 5,
        comment: "Loved the holiday package to Goa. Highly recommended!",
        avatar: "https://randomuser.me/api/portraits/men/85.jpg"
      }
    ];

    res.json({
      success: true,
      data: {
        offers,
        popularRoutes,
        featuredPackages,
        testimonials
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch homepage content' });
  }
});

export default router;
