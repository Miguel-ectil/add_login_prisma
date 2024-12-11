import { hash } from 'bcrypt';
import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    // Hash da senha
    const hashedPassword = await hash(password, 10);

    try {
      const user = await prisma.user.create({
        data: { name, email, password: hashedPassword },
      });
      res.status(201).json({ message: 'User created successfully!', user });
    } catch (error) {
      res.status(400).json({ error: 'User already exists!' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
