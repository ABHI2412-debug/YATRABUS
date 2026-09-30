import express from 'express';

const router = express.Router();

let notifications = [
    { id: 1, type: "cancelation", title: "Cancelation Request", message: "Sunil Pandey requested cancelation for Booking #BK9A2DBD", time: "5m ago", read: false },
    { id: 2, type: "info", title: "New Booking", message: "Rajat booked a trip from Nagpur to Pune", time: "1h ago", read: false },
    { id: 3, type: "alert", title: "Bus Delayed", message: "VedBus Premium MH-12-QZ-8812 is delayed by 30 mins", time: "2h ago", read: false }
];

router.get('/', (req, res) => {
    res.json(notifications);
});

router.post('/', (req, res) => {
    const newNotif = {
        id: Date.now(),
        type: req.body.type || 'info',
        title: req.body.title || 'New Notification',
        message: req.body.message || '',
        time: 'Just now',
        read: false
    };
    notifications = [newNotif, ...notifications];
    res.status(201).json(newNotif);
});

router.post('/mark-read', (req, res) => {
    notifications = notifications.map(n => ({ ...n, read: true }));
    res.json({ success: true });
});

export default router;
