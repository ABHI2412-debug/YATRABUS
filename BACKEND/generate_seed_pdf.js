const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const doc = new PDFDocument({ margin: 40 });
const outputPath = path.join(__dirname, 'VEDBUS_Seed_File_Documentation.pdf');
const writeStream = fs.createWriteStream(outputPath);

doc.pipe(writeStream);

// Title
doc.fontSize(22).fillColor('#1E3A8A').text('VEDBUS Seed File Guide & Explanation', { align: 'center' });
doc.moveDown(0.3);
doc.fontSize(10).fillColor('#6B7280').text(`File Location: BACKEND/src/seed.ts  |  Generated on: ${new Date().toLocaleDateString()}`, { align: 'center' });
doc.moveDown(1.2);

// Section 1: What is a Seed File?
doc.fontSize(14).fillColor('#1E40AF').text('1. Seed File Ka Kya Kaam Hota Hai? (Overview)');
doc.moveDown(0.4);
doc.fontSize(10).fillColor('#1F2937').text(
  'Seed file ek single execution script hoti hai jo database me automated test/dummy data daal deti hai. Jab naya database create hota hai, toh wo bilkul empty (khali) hota hai. Seed script chalaane se ek click me poora realistic data fill ho jaata hai.'
);
doc.moveDown(1);

// Section 2: Key Uses & Benefits
doc.fontSize(14).fillColor('#1E40AF').text('2. Key Benefits & Purpose (Kyu Use Karte Hain?)');
doc.moveDown(0.4);

const benefits = [
  { title: 'Database Fresh Start (Clean Up)', desc: 'Purana sara invalid ya broken data delete karke bilkul clean starting point set karta hai.' },
  { title: 'No Manual Form Filling', desc: 'Aapko admin panel ya site par 50 baar bus details, routes, aur prices manually entry nahi karni padti.' },
  { title: 'Instant Live Demo Ready', desc: 'Client ya reviewer ko demonstration dikhane ke liye instant ticket booking, route search aur packages active rehte hain.' },
  { title: 'Consistent Test Environment', desc: 'Testing ke waqt agar data corrupt ho jaye, toh npm run seed chala ke wapas fresh data mil jaata hai.' }
];

benefits.forEach((b) => {
  doc.fontSize(11).fillColor('#047857').text(`• ${b.title}`);
  doc.fontSize(10).fillColor('#4B5563').text(`   ${b.desc}`);
  doc.moveDown(0.3);
});

doc.moveDown(0.8);

// Section 3: Seeded Data Breakdown
doc.fontSize(14).fillColor('#1E40AF').text('3. What Data Is Populated By seed.ts?');
doc.moveDown(0.4);

const seededItems = [
  '8 Users: 1 Admin (admin@vedbus.in / Admin@1234) + 7 Demo Users (User@1234)',
  '12 Buses: Volvo B11R Multi-Axle, BharatBenz AC Sleeper, Scania Metrolink',
  '10 Major Routes: Nagpur-Pune, Mumbai-Goa, Delhi-Manali, Bangalore-Hyderabad, etc.',
  '30 Trips: Scheduled across Today, Tomorrow, and Day+2 with real fares & timings',
  '6 Tour Packages: Char Dham Yatra, Dubai Safari, Himachal Snow Special, etc.',
  '7 Promo Offers: VEDBUS10, FIRST50, YATRA20, DIWALI15, MONSOON30, etc.',
  '10 Bus Bookings & 7 Package Bookings with confirmed seat maps & amounts',
  '7 Support Tickets with Open, In_Progress, and Resolved statuses'
];

seededItems.forEach((item) => {
  doc.fontSize(10).fillColor('#1F2937').text(`- ${item}`);
  doc.moveDown(0.25);
});

doc.moveDown(1);

// Section 4: How to Run
doc.fontSize(14).fillColor('#1E40AF').text('4. How to Execute the Seed Script');
doc.moveDown(0.4);
doc.fontSize(10).fillColor('#B45309').text('Command (Run from BACKEND folder):');
doc.moveDown(0.2);
doc.fontSize(11).fillColor('#1E1B4B').text('   npm run seed');
doc.moveDown(0.5);
doc.fontSize(9).fillColor('#6B7280').text('Note: Sirf ek baar chalayein. Iske baad poori VEDBUS backend API actual database data ke saath serve karegi.');

doc.end();

writeStream.on('finish', () => {
  console.log('Seed PDF generated successfully at:', outputPath);
});
