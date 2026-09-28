import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const BUSES = [
  { plateNumber: "MH-31-AP-4921", type: "BharatBenz AC Sleeper (2+1)",     totalSeats: 40, amenities: { wifi: true,  charging: true,  blanket: true,  gps: true  }, status: "Active", lastServiced: new Date("2026-08-12"), busStyle: "sleeper" },
  { plateNumber: "MH-12-QZ-8812", type: "Multi-Axle Volvo B11R AC Seater (2+2)",    totalSeats: 42, amenities: { wifi: true,  charging: true,  blanket: true,  gps: true  }, status: "Active", lastServiced: new Date("2026-07-28"), busStyle: "seater"    },
  { plateNumber: "MH-14-BT-9900", type: "Volvo AC Sleeper Multi-Axle (2+1)",   totalSeats: 49, amenities: { wifi: true,  charging: true,  blanket: false, gps: true, sos: true  }, status: "Active", lastServiced: new Date("2026-09-02"), busStyle: "sleeper" },
  { plateNumber: "MH-31-EX-5544", type: "BharatBenz Executive AC Seater (2+2)",       totalSeats: 52, amenities: { wifi: false,  charging: true, blanket: false,  gps: true  }, status: "Active", lastServiced: new Date("2026-08-18"), busStyle: "seater"    },
  { plateNumber: "MH-12-NT-3321", type: "Scania Metrolink AC Sleeper (2+1)", totalSeats: 45, amenities: { wifi: true,  charging: true,  blanket: true, gps: true, sos: true }, status: "Active", lastServiced: new Date("2026-06-10"), busStyle: "sleeper" }
];

const PACKAGES = [
  {
    title: 'Char Dham Yatra & Haridwar Special',
    category: 'Spiritual',
    pricePerPerson: 24499,
    durationDays: 10,
    itinerary: {
      id: 'chardham',
      duration: '10 Days / 9 Nights',
      destinations: 'Kedarnath • Badrinath • Gangotri • Yamunotri',
      image: '/images/vedbus_all_india_spiritual_darshan_bus_tickets_holiday_packages_9.jpg',
      badge: 'VIP Darshan & Helicopter Assist',
      badgeColor: 'bg-amber-600 text-white',
      description: 'Complete Himalayan circuit with 2x2 BharatBenz AC Pushback transit, verified warm Himalayan stays, hot Satvik meals, and medical oxygen kit onboard.',
      highlights: ['Deluxe Stays', 'Pure Satvik Food', 'Har Ki Pauri Aarti', 'Helicopter Pass Assistance'],
    }
  },
  {
    title: 'Dubai Desert Safari & Marina Skyline',
    category: 'International',
    pricePerPerson: 48999,
    durationDays: 5,
    itinerary: {
      id: 'dubai-marina',
      duration: '5 Days / 4 Nights',
      destinations: 'Dubai • Abu Dhabi • Desert Safari',
      image: '/images/vedbus_international_holiday_travel_packages_1.jpg',
      badge: '4-Star Marina Hotel & Visa Included',
      badgeColor: 'bg-teal-600 text-white',
      description: 'Bask in luxury with Burj Khalifa 124th floor entry, 4x4 Dune Bashing, BBQ Desert Camp with Tanoura Show, and Dhow Cruise Marina Dinner.',
      highlights: ['Burj Khalifa 124th Floor', 'Dhow Dinner Cruise', '4x4 Desert Safari', 'Instant Express eVisa'],
    }
  },
  {
    title: 'Himachal Manali & Solang Valley Snow Special',
    category: 'Domestic',
    pricePerPerson: 9499,
    durationDays: 5,
    itinerary: {
      id: 'himachal-manali',
      duration: '5 Days / 4 Nights',
      destinations: 'Shimla • Kullu • Manali • Solang Valley',
      image: '/images/vedbus_all_india_spiritual_darshan_bus_tickets_holiday_packages_4.jpg',
      badge: 'Atal Tunnel & Snow Activity Pass',
      badgeColor: 'bg-emerald-600 text-white',
      description: 'Snowy Himalayan retreat with Volvo AC sleeper Delhi-Manali transit, Solang Valley sports pass, Atal Tunnel excursion, and bonfire night dinner.',
      highlights: ['Atal Tunnel Tour', 'Solang Snow Sports', 'Delhi-Manali Volvo', 'Valley View Resort'],
    }
  }
];

async function main() {
  console.log('Seeding database...');
  
  // Clear existing
  await prisma.busBooking.deleteMany({});
  await prisma.packageBooking.deleteMany({});
  await prisma.trip.deleteMany({});
  await prisma.route.deleteMany({});
  await prisma.bus.deleteMany({});
  await prisma.tourPackage.deleteMany({});
  
  // Seed Buses
  const createdBuses = [];
  for (const bus of BUSES) {
    const created = await prisma.bus.create({
      data: {
        plateNumber: bus.plateNumber,
        type: bus.type,
        totalSeats: bus.totalSeats,
        amenities: bus.amenities,
        status: bus.status as any,
        lastServiced: bus.lastServiced,
        busStyle: bus.busStyle
      }
    });
    createdBuses.push(created);
  }
  
  // Seed Route
  const nagpurPuneRoute = await prisma.route.create({
    data: {
      originCity: "Nagpur",
      destinationCity: "Pune",
      waypoints: ["Amravati", "Aurangabad", "Ahmednagar"],
      distanceKm: 720
    }
  });

  // Seed Trips (Tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const TRIPS = [
    { busIndex: 0, depHour: 20, depMin: 30, arrHour: 7, arrMin: 0, fare: 850 }, // VRL
    { busIndex: 1, depHour: 6, depMin: 0, arrHour: 15, arrMin: 45, fare: 450 }, // Purple
    { busIndex: 2, depHour: 21, depMin: 15, arrHour: 7, arrMin: 30, fare: 950 }, // Orange
    { busIndex: 3, depHour: 14, depMin: 0, arrHour: 0, arrMin: 0, fare: 599 },  // Hans (arrival is next day)
    { busIndex: 4, depHour: 22, depMin: 0, arrHour: 7, arrMin: 30, fare: 1199 }, // Neeta
  ];

  for (const t of TRIPS) {
    const depDate = new Date(tomorrow);
    depDate.setHours(t.depHour, t.depMin, 0, 0);
    
    const arrDate = new Date(tomorrow);
    if (t.arrHour < t.depHour) arrDate.setDate(arrDate.getDate() + 1);
    arrDate.setHours(t.arrHour, t.arrMin, 0, 0);

    await prisma.trip.create({
      data: {
        busId: createdBuses[t.busIndex].id,
        routeId: nagpurPuneRoute.id,
        departureDatetime: depDate,
        arrivalDatetime: arrDate,
        baseFare: t.fare,
        status: "Scheduled"
      }
    });
  }

  // Seed Packages
  for (const pkg of PACKAGES) {
    await prisma.tourPackage.create({
      data: {
        title: pkg.title,
        category: pkg.category as any,
        pricePerPerson: pkg.pricePerPerson,
        durationDays: pkg.durationDays,
        itinerary: pkg.itinerary
      }
    });
  }
  
  console.log(`Successfully seeded ${createdBuses.length} buses, 1 route, ${TRIPS.length} trips, and ${PACKAGES.length} packages!`);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
