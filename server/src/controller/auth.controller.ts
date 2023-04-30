import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import config from '../config';

const prisma = new PrismaClient();

const SECRET_KEY: Secret | undefined = config.secret;

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password and name are required' });
    }
    const foundUser = await prisma.user.findUnique({ where: { email } });

    if (!foundUser) return res.status(404).json('the user or the password incorrect');

    const isMatch = bcrypt.compareSync(password, foundUser.password);

    if (isMatch) {
      const token = jwt.sign({ userId: foundUser.id }, SECRET_KEY as Secret, {
        expiresIn: '1 days',
      });
      res.status(200).json({ email: foundUser.email, name: foundUser.name, token });
    } else {
      res.status(400).json({ message: 'Email and password and name are required' });
    }
  } catch (error: any) {
    console.log(error.message);
    return res.status(500);
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Email and password and name are required' });
    }
    const isEmailExist = await prisma.user.findUnique({ where: { email } });

    if (isEmailExist) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ userId: newUser.id }, SECRET_KEY as Secret, { expiresIn: '1 days' });

    res.status(200).json({ email: newUser.email, name: newUser.name, token });
  } catch (error: any) {
    console.log(error.message);

    return res.status(500);
  }
};
