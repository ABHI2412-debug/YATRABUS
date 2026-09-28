import { Router } from 'express';
import { prisma } from '../prisma';

const router = Router();

// GET all active packages
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const whereClause: any = { isActive: true };
    
    if (category) {
      // Must match prisma enum: Domestic, International, Spiritual
      const catStr = String(category).charAt(0).toUpperCase() + String(category).slice(1).toLowerCase();
      whereClause.category = catStr;
    }

    let packages = await prisma.tourPackage.findMany({
      where: whereClause,
      orderBy: {
        pricePerPerson: 'asc'
      }
    });

    if (packages.length === 0) {
      // Mock data if DB is empty
      const mockPackages = [
        {
          id: 'chardham',
          category: 'Spiritual',
          title: 'Char Dham Yatra & Haridwar Special',
          durationDays: 10,
          duration: '10 Days / 9 Nights',
          destinations: 'Kedarnath • Badrinath • Gangotri • Yamunotri',
          image: '/images/vedbus_all_india_spiritual_darshan_bus_tickets_holiday_packages_9.jpg',
          badge: 'VIP Darshan & Helicopter Assist',
          badgeColor: 'bg-amber-600 text-white',
          description: 'Complete Himalayan circuit with 2x2 BharatBenz AC Pushback transit, verified warm Himalayan stays, hot Satvik meals, and medical oxygen kit onboard.',
          highlights: ['Deluxe Stays', 'Pure Satvik Food', 'Har Ki Pauri Aarti', 'Helicopter Pass Assistance'],
          price: '₹24,499'
        },
        {
          id: 'dubai-marina',
          category: 'International',
          title: 'Dubai Desert Safari & Marina Skyline',
          durationDays: 5,
          duration: '5 Days / 4 Nights',
          destinations: 'Dubai • Abu Dhabi • Desert Safari',
          image: '/images/vedbus_international_holiday_travel_packages_1.jpg',
          badge: '4-Star Marina Hotel & Visa Included',
          badgeColor: 'bg-teal-600 text-white',
          description: 'Bask in luxury with Burj Khalifa 124th floor entry, 4x4 Dune Bashing, BBQ Desert Camp with Tanoura Show, and Dhow Cruise Marina Dinner.',
          highlights: ['Burj Khalifa 124th Floor', 'Dhow Dinner Cruise', '4x4 Desert Safari', 'Instant Express eVisa'],
          price: '₹48,999'
        },
        {
          id: 'himachal-manali',
          category: 'Domestic',
          title: 'Himachal Manali & Solang Valley Snow Special',
          durationDays: 5,
          duration: '5 Days / 4 Nights',
          destinations: 'Shimla • Kullu • Manali • Solang Valley',
          image: '/images/vedbus_all_india_spiritual_darshan_bus_tickets_holiday_packages_4.jpg',
          badge: 'Atal Tunnel & Snow Activity Pass',
          badgeColor: 'bg-emerald-600 text-white',
          description: 'Snowy Himalayan retreat with Volvo AC sleeper Delhi-Manali transit, Solang Valley sports pass, Atal Tunnel excursion, and bonfire night dinner.',
          highlights: ['Atal Tunnel Tour', 'Solang Snow Sports', 'Delhi-Manali Volvo', 'Valley View Resort'],
          price: '₹9,499'
        }
      ];
      return res.json(mockPackages.filter(p => !category || p.category.toLowerCase() === String(category).toLowerCase()));
    }

    res.json(packages.map(p => {
      const it: any = typeof p.itinerary === 'object' && p.itinerary ? p.itinerary : {};
      return {
        ...p,
        ...it,
        price: `₹${p.pricePerPerson.toString()}`,
      };
    }));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch packages' });
  }
});

// GET single package by ID
router.get('/:id', async (req, res) => {
  try {
    const pkg = await prisma.tourPackage.findUnique({
      where: { id: req.params.id }
    });
    if (!pkg) return res.status(404).json({ error: 'Package not found' });
    res.json(pkg);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch package' });
  }
});

// POST to book a package
router.post('/book', async (req, res) => {
  try {
    const { packageId, travelersCount, travelDate, totalAmount } = req.body;
    let userId = (req as any).user?.id;
    
    if (!userId) {
      const fallbackUser = await prisma.user.findFirst();
      if (fallbackUser) userId = fallbackUser.id;
    }

    if (!packageId || !travelersCount || !travelDate || !userId) {
      return res.status(400).json({ error: 'Missing booking details' });
    }

    const booking = await prisma.packageBooking.create({
      data: {
        userId,
        packageId,
        travelersCount,
        travelDate: new Date(travelDate),
        totalAmount,
        status: 'Confirmed'
      }
    });

    res.status(201).json({ success: true, booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create package booking' });
  }
});

export default router;
