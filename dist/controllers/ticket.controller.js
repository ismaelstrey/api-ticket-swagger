import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const createTicket = async (req, res) => {
    const { title, description, userId } = req.body;
    try {
        const newTicket = await prisma.ticket.create({
            data: { title, description, userId },
        });
        res.status(201).json(newTicket);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create ticket' });
    }
};
export const updateTicket = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const updatedTicket = await prisma.ticket.update({
            where: { id: parseInt(id) },
            data: { status },
        });
        res.status(200).json(updatedTicket);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update ticket' });
    }
};
export const getTickets = async (_req, res) => {
    try {
        const tickets = await prisma.ticket.findMany();
        res.status(200).json(tickets);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to fetch tickets' });
    }
};
