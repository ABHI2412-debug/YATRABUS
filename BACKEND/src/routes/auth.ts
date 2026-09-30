import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../prisma';
import { authenticateJWT, AuthRequest } from '../middleware/auth';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'yatrabus_super_secret_key';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'yatrabus_super_refresh_secret';

// Register User
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, password } = req.body;
    
    if (!name || !email || !phone || !password) {
      res.status(400).json({ error: 'All fields are required' });
      return;
    }

    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { phone }] }
    });

    if (existingUser) {
      res.status(400).json({ error: 'User with this email or phone already exists' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: { name, email, phone, passwordHash }
    });

    const accessToken = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user.id }, REFRESH_SECRET, { expiresIn: '7d' });
    
    res.status(201).json({ 
      message: 'User registered successfully', 
      accessToken, 
      refreshToken,
      user: { id: user.id, name: user.name, email: user.email, role: user.role } 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// Login User
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }
    
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const accessToken = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user.id }, REFRESH_SECRET, { expiresIn: '7d' });
    
    res.json({ 
      message: 'Login successful', 
      accessToken, 
      refreshToken,
      user: { id: user.id, name: user.name, email: user.email, role: user.role } 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

// Refresh Token
router.post('/refresh', async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(401).json({ error: 'Refresh token missing' });
      return;
    }

    jwt.verify(refreshToken, REFRESH_SECRET, async (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid or expired refresh token' });
      }

      const user = await prisma.user.findUnique({ where: { id: decoded.id } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const newAccessToken = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '15m' });
      res.json({ accessToken: newAccessToken });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to refresh token' });
  }
});

// Check Phone Existence
router.post('/check-phone', async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone } = req.body;
    if (!phone) {
      res.status(400).json({ error: 'Phone number is required' });
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    const user = await prisma.user.findUnique({ where: { phone: cleanPhone } });
    res.json({ exists: !!user });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Login via Mobile OTP (Mocked Verification)
router.post('/login-mobile', async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone } = req.body;
    const cleanPhone = phone.replace(/\D/g, '');
    const user = await prisma.user.findUnique({ where: { phone: cleanPhone } });
    
    if (!user) {
      res.status(404).json({ error: 'User not found. Please sign up.' });
      return;
    }

    const accessToken = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ 
      message: 'Login successful', 
      accessToken, 
      user: { id: user.id, name: user.name, phone: user.phone, role: user.role } 
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login' });
  }
});

// Register via Mobile OTP
router.post('/register-mobile', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone } = req.body;
    const cleanPhone = phone.replace(/\D/g, '');
    
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { phone: cleanPhone }] }
    });

    if (existingUser) {
      res.status(400).json({ error: 'User with this email or phone already exists' });
      return;
    }

    const passwordHash = await bcrypt.hash('dummy_mobile_password', 10);
    const user = await prisma.user.create({
      data: { name, email, phone: cleanPhone, passwordHash }
    });

    const accessToken = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ 
      message: 'User registered successfully', 
      accessToken, 
      user: { id: user.id, name: user.name, phone: user.phone, role: user.role } 
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register' });
  }
});

export default router;
