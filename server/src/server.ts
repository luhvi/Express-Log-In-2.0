import express from 'express';
import type { Request, Response } from 'express';
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

app.post('/api/signin', async (req: Request, res: Response) => {
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

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error('Something went wrong...', error);
    res
      .status(500)
      .json({ success: false, message: 'Something went wrong...' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http:/localhost:${PORT}`);
});
