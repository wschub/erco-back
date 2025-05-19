import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';

//import { setupSocket } from './sockets/offer.socket';
import authRoutes from './routes/auth.routes';
import offerRoutes from './routes/offer.routes';
import transactionRoutes from './routes/transaction.routes';
import {swaggerSpec} from './swagger/swagger';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    //methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Setup sockets
//setupSocket(io);

const PORT = process.env.PORT || 4001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Exporta IO para usarlo en controladores
export { io, server };
