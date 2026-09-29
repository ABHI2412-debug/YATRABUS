import { Router } from 'express';
import { prisma } from '../prisma';

const router = Router();

// GET all active offers
router.get('/', async (req, res) => {
  try {
    const offers = await prisma.offer.findMany({
      where: { isActive: true },
      orderBy: { validUntil: 'desc' }
    });
    res.json(offers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch offers' });
  }
});

// POST to validate an offer code
router.post('/validate', async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).json({ error: 'Offer code required' });

    const offer = await prisma.offer.findUnique({
      where: { code: String(code).toUpperCase() }
    });

    if (!offer || !offer.isActive || new Date(offer.validUntil) < new Date()) {
      return res.status(400).json({ error: 'Invalid or expired offer code' });
    }

    res.json({ success: true, offer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to validate offer' });
  }
});

export default router;
