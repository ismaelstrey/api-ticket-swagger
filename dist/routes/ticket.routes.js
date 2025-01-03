import express from 'express';
import { createTicket, updateTicket, getTickets } from '../controllers/ticket.controller.js';
export const ticketRoutes = express.Router();
ticketRoutes.post('/', createTicket);
ticketRoutes.put('/:id', updateTicket);
ticketRoutes.get('/', getTickets);
