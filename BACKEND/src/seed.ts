import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const prisma = new PrismaClient();

// ── 1. USERS ────────────────────────────────────────────────────────
const USERS = [
  { name: 'Admin Vedbus',    email: 'admin@vedbus.in',       phone: '9000000001', password: 'Admin@1234',  role: 'ADMIN' },
  { name: 'Rahul Sharma',   email: 'rahul@example.com',     phone: '9876543210', password: 'User@1234',   role: 'USER'  },
  { name: 'Priya Patel',    email: 'priya@example.com',     phone: '9876543211', password: 'User@1234',   role: 'USER'  },
  { name: 'Amit Kumar',     email: 'amit@example.com',      phone: '9876543212', password: 'User@1234',   role: 'USER'  },
  { name: 'Sneha Desai',    email: 'sneha@example.com',     phone: '9876543213', password: 'User@1234',   role: 'USER'  },
  { name: 'Vikram Singh',   email: 'vikram@example.com',    phone: '9876543214', password: 'User@1234',   role: 'USER'  },
  { name: 'Meera Joshi',    email: 'meera@example.com',     phone: '9876543215', password: 'User@1234',   role: 'USER'  },
  { name: 'Arjun Rao',      email: 'arjun@example.com',     phone: '9876543216', password: 'User@1234',   role: 'USER'  },
];

// ── 2. BUSES ────────────────────────────────────────────────────────
const BUSES = [
  { plateNumber: 'MH-31-AP-4921', type: 'BharatBenz AC Sleeper (2+1)',          totalSeats: 40, amenities: { wifi: true,  charging: true,  blanket: true,  gps: true,  sos: false }, status: 'Active', lastServiced: new Date('2026-08-12'), busStyle: 'sleeper' },
  { plateNumber: 'MH-12-QZ-8812', type: 'Multi-Axle Volvo B11R AC Seater (2+2)', totalSeats: 42, amenities: { wifi: true,  charging: true,  blanket: false, gps: true,  sos: false }, status: 'Active', lastServiced: new Date('2026-07-28'), busStyle: 'seater'  },
  { plateNumber: 'MH-14-BT-9900', type: 'Volvo AC Sleeper Multi-Axle (2+1)',    totalSeats: 49, amenities: { wifi: true,  charging: true,  blanket: true,  gps: true,  sos: true  }, status: 'Active', lastServiced: new Date('2026-09-02'), busStyle: 'sleeper' },
  { plateNumber: 'MH-31-EX-5544', type: 'BharatBenz Executive AC Seater (2+2)', totalSeats: 52, amenities: { wifi: false, charging: true,  blanket: false, gps: true,  sos: false }, status: 'Active', lastServiced: new Date('2026-08-18'), busStyle: 'seater'  },
  { plateNumber: 'MH-12-NT-3321', type: 'Scania Metrolink AC Sleeper (2+1)',    totalSeats: 45, amenities: { wifi: true,  charging: true,  blanket: true,  gps: true,  sos: true  }, status: 'Active', lastServiced: new Date('2026-06-10'), busStyle: 'sleeper' },
  { plateNumber: 'GJ-01-ZX-7732', type: 'Mercedes Benz Seater AC (2+2)',        totalSeats: 44, amenities: { wifi: true,  charging: true,  blanket: false, gps: true,  sos: false }, status: 'Active', lastServiced: new Date('2026-08-05'), busStyle: 'seater'  },
  { plateNumber: 'KA-05-MN-1122', type: 'Volvo 9400 AC Sleeper (2+1)',          totalSeats: 36, amenities: { wifi: true,  charging: true,  blanket: true,  gps: true,  sos: true  }, status: 'Active', lastServiced: new Date('2026-09-10'), busStyle: 'sleeper' },
  { plateNumber: 'DL-01-HH-9911', type: 'BharatBenz Non-AC Seater (2+3)',       totalSeats: 55, amenities: { wifi: false, charging: false, blanket: false, gps: false, sos: false }, status: 'Active', lastServiced: new Date('2026-07-01'), busStyle: 'seater'  },
  { plateNumber: 'MH-04-TK-3344', type: 'Scania AC Sleeper (2+1)',              totalSeats: 42, amenities: { wifi: true,  charging: true,  blanket: true,  gps: true,  sos: false }, status: 'Active', lastServiced: new Date('2026-08-25'), busStyle: 'sleeper' },
  { plateNumber: 'RJ-14-PQ-5566', type: 'Volvo AC Semi-Sleeper (2+2)',          totalSeats: 46, amenities: { wifi: true,  charging: true,  blanket: false, gps: true,  sos: false }, status: 'Active', lastServiced: new Date('2026-09-15'), busStyle: 'seater'  },
  { plateNumber: 'MH-20-GA-1010', type: 'BharatBenz AC Sleeper (2+1)',          totalSeats: 40, amenities: { wifi: true,  charging: true,  blanket: true,  gps: true,  sos: true  }, status: 'In_Maintenance', lastServiced: new Date('2026-05-12'), busStyle: 'sleeper' },
  { plateNumber: 'TN-09-LK-8877', type: 'Ashok Leyland AC Sleeper (2+1)',       totalSeats: 42, amenities: { wifi: false, charging: true,  blanket: true,  gps: true,  sos: false }, status: 'Active', lastServiced: new Date('2026-09-01'), busStyle: 'sleeper' },
];

// ── 3. ROUTES ────────────────────────────────────────────────────────
const ROUTES = [
  { originCity: 'Nagpur',    destinationCity: 'Pune',         waypoints: ['Amravati', 'Aurangabad', 'Ahmednagar'],   distanceKm: 720  },
  { originCity: 'Mumbai',    destinationCity: 'Goa',          waypoints: ['Pune', 'Kolhapur', 'Belgaum'],           distanceKm: 590  },
  { originCity: 'Delhi',     destinationCity: 'Manali',       waypoints: ['Chandigarh', 'Mandi', 'Kullu'],          distanceKm: 570  },
  { originCity: 'Bangalore', destinationCity: 'Hyderabad',    waypoints: ['Tumkur', 'Kurnool'],                      distanceKm: 568  },
  { originCity: 'Mumbai',    destinationCity: 'Ahmedabad',    waypoints: ['Surat', 'Vadodara'],                      distanceKm: 530  },
  { originCity: 'Delhi',     destinationCity: 'Jaipur',       waypoints: ['Gurgaon', 'Neemrana', 'Shahpura'],        distanceKm: 285  },
  { originCity: 'Chennai',   destinationCity: 'Bangalore',    waypoints: ['Vellore', 'Krishnagiri'],                distanceKm: 350  },
  { originCity: 'Hyderabad', destinationCity: 'Mumbai',       waypoints: ['Solapur', 'Pune'],                        distanceKm: 710  },
  { originCity: 'Kolkata',   destinationCity: 'Bhubaneswar',  waypoints: ['Midnapore', 'Kharagpur'],                 distanceKm: 450  },
  { originCity: 'Pune',      destinationCity: 'Mumbai',       waypoints: ['Lonavala', 'Khopoli'],                   distanceKm: 150  },
];

// ── 4. OFFERS ────────────────────────────────────────────────────────
const OFFERS = [
  { code: 'VEDBUS10',  discountPercentage: 10, maxDiscountAmount: 100, validUntil: new Date('2027-03-31'), isActive: true },
  { code: 'FIRST50',   discountPercentage: 50, maxDiscountAmount: 250, validUntil: new Date('2027-01-31'), isActive: true },
  { code: 'YATRA20',   discountPercentage: 20, maxDiscountAmount: 200, validUntil: new Date('2026-12-31'), isActive: true },
  { code: 'DIWALI15',  discountPercentage: 15, maxDiscountAmount: 150, validUntil: new Date('2026-11-15'), isActive: true },
  { code: 'MONSOON30', discountPercentage: 30, maxDiscountAmount: 300, validUntil: new Date('2026-10-31'), isActive: true },
  { code: 'NEWUSER25', discountPercentage: 25, maxDiscountAmount: 175, validUntil: new Date('2027-06-30'), isActive: true },
  { code: 'OLDOFFER',  discountPercentage: 40, maxDiscountAmount: 400, validUntil: new Date('2025-01-01'), isActive: false }, // Expired
];

// ── 5. TOUR PACKAGES ─────────────────────────────────────────────────
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
  },
  {
    title: 'Golden Temple & Amritsar Heritage Tour',
    category: 'Spiritual',
    pricePerPerson: 7999,
    durationDays: 3,
    itinerary: {
      id: 'amritsar-golden',
      duration: '3 Days / 2 Nights',
      destinations: 'Amritsar • Wagah Border • Durgiana Temple',
      image: '/images/vedbus_all_india_spiritual_darshan_bus_tickets_holiday_packages_9.jpg',
      badge: 'Border Retreat Ceremony Pass',
      badgeColor: 'bg-orange-600 text-white',
      description: 'Experience the spiritual aura of the Golden Temple, witness the patriotic Wagah Border ceremony, and enjoy authentic Amritsari cuisine.',
      highlights: ['Golden Temple Darshan', 'Wagah Border Parade', 'Langar Experience', 'Amritsari Kulcha Trail'],
    }
  },
  {
    title: 'Goa Beach Carnival & Water Sports Special',
    category: 'Domestic',
    pricePerPerson: 12999,
    durationDays: 5,
    itinerary: {
      id: 'goa-beach',
      duration: '5 Days / 4 Nights',
      destinations: 'North Goa • South Goa • Panjim',
      image: '/images/vedbus_all_india_spiritual_darshan_bus_tickets_holiday_packages_4.jpg',
      badge: 'Water Sports + Casino Night Pass',
      badgeColor: 'bg-blue-600 text-white',
      description: 'Sun, sand and surf — complete Goa getaway with Baga, Calangute, and Anjuna beach hopping, scuba diving, casino night, and sunset cruise.',
      highlights: ['Scuba Diving', 'Casino Night', 'Sunset Cruise', 'Spice Plantation Tour'],
    }
  },
  {
    title: 'Singapore & Bali International Explorer',
    category: 'International',
    pricePerPerson: 69999,
    durationDays: 8,
    itinerary: {
      id: 'singapore-bali',
      duration: '8 Days / 7 Nights',
      destinations: 'Singapore • Bali • Sentosa Island',
      image: '/images/vedbus_international_holiday_travel_packages_1.jpg',
      badge: '5-Star Stays & Visa Included',
      badgeColor: 'bg-purple-600 text-white',
      description: 'Twin destination luxury — Marina Bay Sands Singapore, Universal Studios, followed by Bali temples, rice terraces, and beach clubs.',
      highlights: ['Universal Studios', 'Bali Tanah Lot Temple', 'Marina Bay Sands', 'Kuta Beach Club'],
    }
  },
];

// ── Helper to make date offsets from today ───────────────────────────
function daysFromNow(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d;
}
function setTime(base: Date, h: number, m: number): Date {
  const d = new Date(base);
  d.setHours(h, m, 0, 0);
  return d;
}

async function main() {
  console.log('\n🌱  Starting VEDBUS mega seed...\n');

  // ─── CLEAR ALL DATA (order matters due to FK constraints) ───────────
  await prisma.supportTicket.deleteMany({});
  await prisma.packageBooking.deleteMany({});
  await prisma.busBooking.deleteMany({});
  await prisma.trip.deleteMany({});
  await prisma.route.deleteMany({});
  await prisma.bus.deleteMany({});
  await prisma.tourPackage.deleteMany({});
  await prisma.offer.deleteMany({});
  await prisma.user.deleteMany({});
  console.log('✅  Cleared all existing data.');

  // ─── SEED USERS ─────────────────────────────────────────────────────
  const createdUsers: any[] = [];
  for (const u of USERS) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(u.password, salt);
    const user = await prisma.user.create({
      data: { name: u.name, email: u.email, phone: u.phone, passwordHash, role: u.role as any }
    });
    createdUsers.push(user);
  }
  console.log(`✅  Seeded ${createdUsers.length} users (1 admin + ${createdUsers.length - 1} regular users).`);

  // ─── SEED BUSES ─────────────────────────────────────────────────────
  const createdBuses: any[] = [];
  for (const b of BUSES) {
    const bus = await prisma.bus.create({
      data: {
        plateNumber: b.plateNumber,
        type: b.type,
        totalSeats: b.totalSeats,
        amenities: b.amenities,
        status: b.status as any,
        lastServiced: b.lastServiced,
        busStyle: b.busStyle,
      }
    });
    createdBuses.push(bus);
  }
  console.log(`✅  Seeded ${createdBuses.length} buses.`);

  // ─── SEED ROUTES ────────────────────────────────────────────────────
  const createdRoutes: any[] = [];
  for (const r of ROUTES) {
    const route = await prisma.route.create({ data: r });
    createdRoutes.push(route);
  }
  console.log(`✅  Seeded ${createdRoutes.length} routes.`);

  // ─── SEED TRIPS (Multiple dates so demo booking works) ─────────────
  // We create trips for: today, tomorrow, day+2, day+3, day+4
  // Each route gets at least 2-3 buses assigned
  const tripConfigs = [
    // Nagpur → Pune (route index 0) — Buses 0,1,2
    { routeIdx: 0, busIdx: 0,  dayOffset: 0, depH: 20, depM: 30, arrH: 7,  arrM: 0,  arrDayExtra: 1, fare: 850  },
    { routeIdx: 0, busIdx: 1,  dayOffset: 0, depH: 6,  depM: 0,  arrH: 15, arrM: 45, arrDayExtra: 0, fare: 450  },
    { routeIdx: 0, busIdx: 2,  dayOffset: 0, depH: 21, depM: 15, arrH: 7,  arrM: 30, arrDayExtra: 1, fare: 950  },
    { routeIdx: 0, busIdx: 0,  dayOffset: 1, depH: 20, depM: 30, arrH: 7,  arrM: 0,  arrDayExtra: 1, fare: 850  },
    { routeIdx: 0, busIdx: 1,  dayOffset: 1, depH: 6,  depM: 0,  arrH: 15, arrM: 45, arrDayExtra: 0, fare: 450  },
    { routeIdx: 0, busIdx: 3,  dayOffset: 1, depH: 14, depM: 0,  arrH: 23, arrM: 30, arrDayExtra: 0, fare: 599  },
    { routeIdx: 0, busIdx: 4,  dayOffset: 2, depH: 22, depM: 0,  arrH: 7,  arrM: 30, arrDayExtra: 1, fare: 1199 },
    { routeIdx: 0, busIdx: 2,  dayOffset: 2, depH: 10, depM: 0,  arrH: 20, arrM: 0,  arrDayExtra: 0, fare: 750  },
    // Mumbai → Goa (route index 1) — Buses 3,4,5
    { routeIdx: 1, busIdx: 3,  dayOffset: 0, depH: 19, depM: 0,  arrH: 8,  arrM: 0,  arrDayExtra: 1, fare: 1100 },
    { routeIdx: 1, busIdx: 4,  dayOffset: 0, depH: 21, depM: 0,  arrH: 10, arrM: 0,  arrDayExtra: 1, fare: 1350 },
    { routeIdx: 1, busIdx: 5,  dayOffset: 1, depH: 22, depM: 0,  arrH: 11, arrM: 0,  arrDayExtra: 1, fare: 999  },
    { routeIdx: 1, busIdx: 3,  dayOffset: 2, depH: 20, depM: 30, arrH: 9,  arrM: 30, arrDayExtra: 1, fare: 1100 },
    // Delhi → Manali (route index 2) — Buses 6,7
    { routeIdx: 2, busIdx: 6,  dayOffset: 0, depH: 18, depM: 0,  arrH: 8,  arrM: 0,  arrDayExtra: 1, fare: 1400 },
    { routeIdx: 2, busIdx: 7,  dayOffset: 1, depH: 17, depM: 30, arrH: 9,  arrM: 0,  arrDayExtra: 1, fare: 699  },
    { routeIdx: 2, busIdx: 6,  dayOffset: 2, depH: 18, depM: 0,  arrH: 8,  arrM: 0,  arrDayExtra: 1, fare: 1400 },
    // Bangalore → Hyderabad (route index 3) — Buses 8,9
    { routeIdx: 3, busIdx: 8,  dayOffset: 0, depH: 20, depM: 0,  arrH: 6,  arrM: 30, arrDayExtra: 1, fare: 999  },
    { routeIdx: 3, busIdx: 9,  dayOffset: 0, depH: 7,  depM: 0,  arrH: 16, arrM: 0,  arrDayExtra: 0, fare: 850  },
    { routeIdx: 3, busIdx: 8,  dayOffset: 1, depH: 22, depM: 0,  arrH: 8,  arrM: 0,  arrDayExtra: 1, fare: 999  },
    // Mumbai → Ahmedabad (route index 4) — Buses 5,9
    { routeIdx: 4, busIdx: 5,  dayOffset: 0, depH: 7,  depM: 0,  arrH: 14, arrM: 0,  arrDayExtra: 0, fare: 550  },
    { routeIdx: 4, busIdx: 9,  dayOffset: 1, depH: 8,  depM: 0,  arrH: 15, arrM: 0,  arrDayExtra: 0, fare: 650  },
    // Delhi → Jaipur (route index 5) — Buses 7,8
    { routeIdx: 5, busIdx: 7,  dayOffset: 0, depH: 6,  depM: 0,  arrH: 11, arrM: 0,  arrDayExtra: 0, fare: 299  },
    { routeIdx: 5, busIdx: 8,  dayOffset: 0, depH: 15, depM: 0,  arrH: 20, arrM: 0,  arrDayExtra: 0, fare: 350  },
    { routeIdx: 5, busIdx: 7,  dayOffset: 1, depH: 6,  depM: 0,  arrH: 11, arrM: 0,  arrDayExtra: 0, fare: 299  },
    // Chennai → Bangalore (route index 6) — Buses 11
    { routeIdx: 6, busIdx: 11, dayOffset: 0, depH: 6,  depM: 30, arrH: 13, arrM: 0,  arrDayExtra: 0, fare: 499  },
    { routeIdx: 6, busIdx: 11, dayOffset: 1, depH: 22, depM: 0,  arrH: 4,  arrM: 30, arrDayExtra: 1, fare: 599  },
    // Hyderabad → Mumbai (route index 7) — Buses 4
    { routeIdx: 7, busIdx: 4,  dayOffset: 0, depH: 17, depM: 0,  arrH: 7,  arrM: 0,  arrDayExtra: 1, fare: 1250 },
    { routeIdx: 7, busIdx: 4,  dayOffset: 2, depH: 17, depM: 0,  arrH: 7,  arrM: 0,  arrDayExtra: 1, fare: 1250 },
    // Pune → Mumbai (route index 9) — Buses 1,5
    { routeIdx: 9, busIdx: 1,  dayOffset: 0, depH: 7,  depM: 0,  arrH: 9,  arrM: 30, arrDayExtra: 0, fare: 199  },
    { routeIdx: 9, busIdx: 5,  dayOffset: 0, depH: 13, depM: 0,  arrH: 15, arrM: 30, arrDayExtra: 0, fare: 249  },
    { routeIdx: 9, busIdx: 1,  dayOffset: 1, depH: 7,  depM: 0,  arrH: 9,  arrM: 30, arrDayExtra: 0, fare: 199  },
  ];

  const createdTrips: any[] = [];
  for (const tc of tripConfigs) {
    const baseDay = daysFromNow(tc.dayOffset);
    const dep = setTime(baseDay, tc.depH, tc.depM);
    const arrBase = daysFromNow(tc.dayOffset + tc.arrDayExtra);
    const arr = setTime(arrBase, tc.arrH, tc.arrM);

    const trip = await prisma.trip.create({
      data: {
        busId: createdBuses[tc.busIdx].id,
        routeId: createdRoutes[tc.routeIdx].id,
        departureDatetime: dep,
        arrivalDatetime: arr,
        baseFare: tc.fare,
        status: 'Scheduled',
      }
    });
    createdTrips.push(trip);
  }
  console.log(`✅  Seeded ${createdTrips.length} trips across ${createdRoutes.length} routes.`);

  // ─── SEED PACKAGES ──────────────────────────────────────────────────
  const createdPackages: any[] = [];
  for (const pkg of PACKAGES) {
    const p = await prisma.tourPackage.create({
      data: {
        title: pkg.title,
        category: pkg.category as any,
        pricePerPerson: pkg.pricePerPerson,
        durationDays: pkg.durationDays,
        itinerary: pkg.itinerary,
        isActive: true,
      }
    });
    createdPackages.push(p);
  }
  console.log(`✅  Seeded ${createdPackages.length} tour packages.`);

  // ─── SEED OFFERS ────────────────────────────────────────────────────
  for (const offer of OFFERS) {
    await prisma.offer.create({ data: offer });
  }
  console.log(`✅  Seeded ${OFFERS.length} offer codes.`);

  // ─── SEED BUS BOOKINGS (Realistic demo data) ─────────────────────
  // Use regular users (index 1+) and some of the earlier trips
  const busBookingSeed = [
    { userIdx: 1, tripIdx: 0,  seats: ['A1', 'A2'],       amount: 1700 },
    { userIdx: 2, tripIdx: 1,  seats: ['B3'],              amount: 450  },
    { userIdx: 3, tripIdx: 2,  seats: ['C1', 'C2', 'C3'], amount: 2850 },
    { userIdx: 4, tripIdx: 8,  seats: ['A5', 'A6'],        amount: 2200 },
    { userIdx: 5, tripIdx: 12, seats: ['D1'],              amount: 1400 },
    { userIdx: 6, tripIdx: 15, seats: ['B2', 'B3'],        amount: 1998 },
    { userIdx: 7, tripIdx: 20, seats: ['A1'],              amount: 550  },
    { userIdx: 1, tripIdx: 21, seats: ['C4', 'C5'],        amount: 700  },
    { userIdx: 2, tripIdx: 25, seats: ['A2'],              amount: 1250 },
    { userIdx: 3, tripIdx: 28, seats: ['B1'],              amount: 199  },
  ];

  for (const bb of busBookingSeed) {
    if (bb.tripIdx < createdTrips.length) {
      await prisma.busBooking.create({
        data: {
          id: crypto.randomUUID(),
          userId:      createdUsers[bb.userIdx].id,
          tripId:      createdTrips[bb.tripIdx].id,
          seatNumbers: bb.seats,
          totalAmount: bb.amount,
          status:      'Confirmed',
        }
      });
    }
  }
  console.log(`✅  Seeded ${busBookingSeed.filter(b => b.tripIdx < createdTrips.length).length} bus bookings.`);

  // ─── SEED PACKAGE BOOKINGS ──────────────────────────────────────────
  const pkgBookingSeed = [
    { userIdx: 1, pkgIdx: 0, travelers: 2, date: daysFromNow(30),  amount: 48998  },
    { userIdx: 2, pkgIdx: 2, travelers: 4, date: daysFromNow(45),  amount: 37996  },
    { userIdx: 3, pkgIdx: 1, travelers: 1, date: daysFromNow(60),  amount: 48999  },
    { userIdx: 4, pkgIdx: 4, travelers: 3, date: daysFromNow(20),  amount: 38997  },
    { userIdx: 5, pkgIdx: 5, travelers: 2, date: daysFromNow(90),  amount: 139998 },
    { userIdx: 6, pkgIdx: 3, travelers: 2, date: daysFromNow(25),  amount: 15998  },
    { userIdx: 7, pkgIdx: 0, travelers: 1, date: daysFromNow(50),  amount: 24499  },
  ];

  for (const pb of pkgBookingSeed) {
    await prisma.packageBooking.create({
      data: {
        userId:        createdUsers[pb.userIdx].id,
        packageId:     createdPackages[pb.pkgIdx].id,
        travelersCount: pb.travelers,
        travelDate:    pb.date,
        totalAmount:   pb.amount,
        status:        'Confirmed',
      }
    });
  }
  console.log(`✅  Seeded ${pkgBookingSeed.length} package bookings.`);

  // ─── SEED SUPPORT TICKETS ───────────────────────────────────────────
  const supportSeed = [
    { userIdx: 1, subject: 'Seat not assigned correctly', message: 'I booked seat A1 but it was taken. Please help.', status: 'Open' },
    { userIdx: 2, subject: 'Refund for cancelled trip',   message: 'My trip on Dec 2 was cancelled. Need refund of ₹900.', status: 'In_Progress' },
    { userIdx: 3, subject: 'Package itinerary query',     message: 'Can you confirm if the Char Dham package includes Gangotri?', status: 'Resolved' },
    { userIdx: 4, subject: 'Bus was late by 3 hours',     message: 'Bus MH-12-QZ-8812 on Nagpur–Pune was 3 hours late. Very inconvenient.', status: 'Closed' },
    { userIdx: 5, subject: 'Coupon YATRA20 not applied',  message: 'Applied YATRA20 at checkout but discount did not reflect.', status: 'Open' },
    { userIdx: 6, subject: 'Change travel date for Goa package', message: 'I want to change my travel date to Jan 20 for the Goa package.', status: 'In_Progress' },
    { userIdx: 7, subject: 'App not showing my bookings', message: 'My bookings page is showing empty even though I have 2 confirmed bookings.', status: 'Open' },
  ];

  for (const st of supportSeed) {
    await prisma.supportTicket.create({
      data: {
        userId:  createdUsers[st.userIdx].id,
        subject: st.subject,
        message: st.message,
        status:  st.status as any,
      }
    });
  }
  console.log(`✅  Seeded ${supportSeed.length} support tickets.`);

  // ─── SUMMARY ─────────────────────────────────────────────────────────
  console.log('\n🎉  VEDBUS database fully seeded!\n');
  console.log('─────────────────────────────────────────────────────');
  console.log(`   👤  Users          : ${createdUsers.length}  (1 Admin + ${createdUsers.length - 1} Users)`);
  console.log(`   🚌  Buses          : ${createdBuses.length}`);
  console.log(`   🗺️   Routes         : ${createdRoutes.length}`);
  console.log(`   📅  Trips          : ${createdTrips.length}`);
  console.log(`   📦  Tour Packages  : ${createdPackages.length}`);
  console.log(`   🏷️   Offer Codes    : ${OFFERS.length}`);
  console.log(`   🎫  Bus Bookings   : ${busBookingSeed.length}`);
  console.log(`   📋  Pkg Bookings   : ${pkgBookingSeed.length}`);
  console.log(`   🎧  Support Tickets: ${supportSeed.length}`);
  console.log('─────────────────────────────────────────────────────');
  console.log('\n🔑  Admin Credentials:');
  console.log('   Email   : admin@vedbus.in');
  console.log('   Password: Admin@1234\n');
  console.log('👤  Demo User Credentials:');
  console.log('   Email   : rahul@example.com');
  console.log('   Password: User@1234\n');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
