import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateJWT, AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// GET user's support tickets
router.get('/', authenticateJWT, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const tickets = await prisma.supportTicket.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch support tickets' });
  }
});

// POST to create a new support ticket
router.post('/', async (req: AuthRequest, res) => {
  try {
    let { subject, message, email } = req.body;
    let userId = req.user?.id;
    
    if (!userId) {
       // if not logged in, try to find user by email or fallback
       const user = email ? await prisma.user.findUnique({ where: { email } }) : await prisma.user.findFirst();
       if (user) userId = user.id;
       else return res.status(400).json({ error: 'User not found or email missing' });
    }

    if (!subject || !message) {
      return res.status(400).json({ error: 'Subject and message are required' });
    }

    const ticket = await prisma.supportTicket.create({
      data: {
        userId,
        subject,
        message,
        status: 'Open'
      }
    });

    res.status(201).json({ success: true, ticket });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create support ticket' });
  }
});

export default router;
