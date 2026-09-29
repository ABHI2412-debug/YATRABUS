const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const doc = new PDFDocument({ margin: 40 });
const outputPath = path.join(__dirname, 'VEDBUS_Auth_Documentation.pdf');
const writeStream = fs.createWriteStream(outputPath);

doc.pipe(writeStream);

// Title
doc.fontSize(20).fillColor('#1E3A8A').text('VEDBUS Backend Auth Documentation & Guide', { align: 'center' });
doc.moveDown(0.5);
doc.fontSize(10).fillColor('#6B7280').text(`Generated on: ${new Date().toLocaleDateString()}`, { align: 'center' });
doc.moveDown(1.5);

// Section 1: Overview
doc.fontSize(14).fillColor('#1E40AF').text('1. File Summary & Overview');
doc.moveDown(0.3);
doc.fontSize(10).fillColor('#1F2937').text('This document explains the authentication architecture, security fixes, and the Postman collection JSON file created for testing the VEDBUS backend.');
doc.moveDown(1);

// Section 2: Postman Collection Breakdown
doc.fontSize(14).fillColor('#1E40AF').text('2. Postman Collection JSON (vedbus_auth_postman_collection.json)');
doc.moveDown(0.3);
doc.fontSize(10).fillColor('#374151').text('File Location: BACKEND/vedbus_auth_postman_collection.json');
doc.moveDown(0.5);

const endpoints = [
  {
    name: 'POST /api/auth/register',
    desc: 'Registers a new user with name, email, phone, and password. Hashes password securely via bcrypt and returns access token (15m) & refresh token (7d).'
  },
  {
    name: 'POST /api/auth/login',
    desc: 'Authenticates user email/password. Validates credentials and returns fresh accessToken and refreshToken.'
  },
  {
    name: 'POST /api/auth/refresh',
    desc: 'Accepts a valid 7-day refreshToken and returns a new 15-minute accessToken without re-prompting for password.'
  },
  {
    name: 'POST /api/auth/logout',
    desc: 'Signals client to clear stored tokens locally to end session safely.'
  }
];

endpoints.forEach((ep) => {
  doc.fontSize(11).fillColor('#047857').text(`• ${ep.name}`);
  doc.fontSize(10).fillColor('#4B5563').text(`   ${ep.desc}`);
  doc.moveDown(0.4);
});

doc.moveDown(0.5);

// Section 3: Backend Security Enhancements
doc.fontSize(14).fillColor('#1E40AF').text('3. Backend Security & Auth Handler Updates (src/routes/auth.ts)');
doc.moveDown(0.3);

const enhancements = [
  'Dual Token Architecture: Short-lived Access Token (15m) + Long-lived Refresh Token (7d).',
  'Rate Limiting: Max 20 requests per 15 minutes per IP on /api/auth to prevent brute-force attacks.',
  'Admin Middleware (isAdmin): Restricted administrative write operations (e.g., POST /api/buses).',
  'Guest Fallback Removal: Removed automatic fallback to random DB users in bookings and packages.',
  'UUID Primary Keys: Replaced timestamp-based IDs with crypto.randomUUID() for collision resistance.',
  'HTTP Security Headers: Integrated Helmet middleware in server.ts.'
];

enhancements.forEach((item) => {
  doc.fontSize(10).fillColor('#1F2937').text(`- ${item}`);
  doc.moveDown(0.3);
});

doc.moveDown(1);

// Section 4: Hinglish Explanation
doc.fontSize(14).fillColor('#1E40AF').text('4. Detailed Explanation in Hinglish');
doc.moveDown(0.3);

const hinglishPoints = [
  { title: 'Ye file kya hai?', text: 'Ye ek Postman Collection JSON file hai jisme naye Auth APIs (Login, Register, Refresh, Logout) ki ready-made testing setup di gayi hai.' },
  { title: 'Kyu banayi gayi?', text: 'Taki aapko Postman me manually URLs, Headers, ya JSON Body type na karni pade. Direct import karke 1-click test kar sakte hain.' },
  { title: 'Kaise use karein?', text: 'Postman me Import -> File Select karo (vedbus_auth_postman_collection.json). Terminal me npm run dev chalao, aur Send daba kar testing shuru karo.' }
];

hinglishPoints.forEach((hp) => {
  doc.fontSize(11).fillColor('#B45309').text(`• ${hp.title}`);
  doc.fontSize(10).fillColor('#374151').text(`   ${hp.text}`);
  doc.moveDown(0.4);
});

doc.end();

writeStream.on('finish', () => {
  console.log('PDF generated successfully at:', outputPath);
});
