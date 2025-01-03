import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
}

export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    console.log(name, email, password);

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: { name, email, password: hashedPassword },
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: 'User registration failed' });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { id: user.id, role: user.role },
                process.env.JWT_SECRET as string,
                { expiresIn: '1h' }
            );
            res.status(200).json({ token });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Login failed' });
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: parseInt(req.params.id) } });
        res.status(200).json(user); // Retorna o usuário encontrado
    } catch (error) {
        res.status(400).json({ error: 'Failed to fetch user' });

    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: { name, email, password },
        });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update user' });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.user.delete({ where: { id: parseInt(id) } });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Failed to delete user' });
    }
};

export const getAllUsers = async (_req: Request, res: Response) => {

    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: 'Failed to fetch users' });
    }
};


