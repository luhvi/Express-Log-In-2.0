import express from 'express';
import type { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const app = express();
const PORT: string | 3000 = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;

type User = {
  email: string;
  hashedPassword: string;
};

const users: User[] = [];

app.use(cors());
app.use(express.json());

const validateCredentials = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  if (!email && !password) {
    res
      .status(400)
      .json({ success: false, message: 'Email and password are Required' });
    return;
  } else if (!email) {
    res.status(400).json({ success: false, message: 'Email is Required' });
    return;
  } else if (!password) {
    res.status(400).json({ success: false, message: 'Password is Required' });
    return;
  }

  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    res
      .status(400)
      .json({ success: false, message: 'Please enter a valid email' });
    return;
  }

  if (password.length < 8) {
    res.status(400).json({
      success: false,
      message: 'Password must be at least 8 characters',
    });
    return;
  }
  next();
};

app.post(
  '/api/signin',
  validateCredentials,
  async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const user = users.find((user) => user.email === email);
      if (!user) {
        res.status(401).json({ success: false, message: 'Account not found' });
        return;
      }

      const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
      if (!passwordMatch) {
        res.status(401).json({ success: false, message: 'Account not found' });
        return;
      }

      if (!JWT_SECRET) {
        res
          .status(500)
          .json({ success: false, message: 'JWT_SECRET not defined' });
        return;
      }

      const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ success: true, token });
    } catch (error) {
      console.error('Something went wrong...', error);
      res
        .status(500)
        .json({ success: false, message: 'Something went wrong...' });
    }
  }
);

app.post(
  '/api/signup',
  validateCredentials,
  async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const userExists = users.some((user) => user.email === email);
      if (userExists) {
        res
          .status(409)
          .json({ success: false, message: 'Account already exists' });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      users.push({ email, hashedPassword });

      if (!JWT_SECRET) {
        res
          .status(500)
          .json({ success: false, message: 'JWT_SECRET not defined' });
        return;
      }
      const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
      res.status(201).json({ success: true, token });
    } catch (error) {
      console.error('Something went wrong...', error);
      res
        .status(500)
        .json({ success: false, message: 'Something went wrong...' });
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server running on http:/localhost:${PORT}`);
});
