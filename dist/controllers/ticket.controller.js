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
export const getTicket = async (req, res) => {
    const { id } = req.params;
    try {
        const ticket = await prisma.ticket.findUnique({ where: { id: parseInt(id) } });
        res.status(200).json(ticket);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to fetch ticket' });
    }
};
export const deleteTicket = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.ticket.delete({ where: { id: parseInt(id) } });
        res.status(200).json({ message: 'Ticket deleted successfully' });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to delete ticket' });
    }
};
export const getTicketsByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const tickets = await prisma.ticket.findMany({ where: { userId: parseInt(userId) } });
        res.status(200).json(tickets);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to fetch tickets' });
    }
};
export const getTicketsByStatus = async (req, res) => {
    const { status } = req.params;
    try {
        const tickets = await prisma.ticket.findMany({ where: { status } });
        res.status(200).json(tickets);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to fetch tickets' });
    }
};
export const getTicketsByPriority = async (req, res) => {
    const { priority } = req.params;
    try {
        const tickets = await prisma.ticket.findMany({ where: { priority } });
        res.status(200).json(tickets);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to fetch tickets' });
    }
};
export const getTicketsByAssignee = async (req, res) => {
    const { assignee } = req.params;
    try {
        const tickets = await prisma.ticket.findMany({ where: { assignee } });
        res.status(200).json(tickets);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to fetch tickets' });
    }
};
export const getTicketsByTitle = async (req, res) => {
    const { title } = req.params;
    try {
        const tickets = await prisma.ticket.findMany({ where: { title } });
        res.status(200).json(tickets);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to fetch tickets' });
    }
};
export const getTicketsByDescription = async (req, res) => {
    const { description } = req.params;
    try {
        const tickets = await prisma.ticket.findMany({ where: { description } });
        res.status(200).json(tickets);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to fetch tickets' });
    }
};
export const getTicketsTotal = async (req, res) => {
    try {
        const tickets = await prisma.ticket.count();
        res.status(200).json(tickets);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to fetch tickets' });
    }
};
