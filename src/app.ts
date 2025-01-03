import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { userRoutes } from './routes/user.routes.js';
import { ticketRoutes } from './routes/ticket.routes.js';
import swaggerUi from 'swagger-ui-express';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const swaggerDocument = JSON.parse(
    readFileSync(join(__dirname, './swagger.json'), 'utf-8')
);

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/users', userRoutes);
app.use('/api/tickets', ticketRoutes);

export default app;
