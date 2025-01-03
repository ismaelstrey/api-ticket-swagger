import express from 'express';
import { createTicket, updateTicket, getTickets, getTicketsTotal, getTicketsByDescription } from '../controllers/ticket.controller.js';

export const ticketRoutes = express.Router();

ticketRoutes.post('/', createTicket);
ticketRoutes.put('/:id', updateTicket);
ticketRoutes.get('/:ByDescription', getTicketsByDescription);
ticketRoutes.get('/', getTickets);
ticketRoutes.get('/total', getTicketsTotal);
ticketRoutes.get('/total', getTicketsTotal);
