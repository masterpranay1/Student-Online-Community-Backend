import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.js';
import userRoutes from './routes/user.routes.js';
import adminRoutes from './routes/admin.routes.js';
import channelRoutes from './routes/channel.routes.js';
import moderatorRoutes from './routes/moderator.routes.js';

import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import { notFound, errorHandler } from './middleware/error.middleware.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  }
});

const port = process.env.PORT || 5000;

const corsOptions = {
  origin: [
    "http://192.168.100.214:5173",
    "http://localhost:5173",
    "https://student-online-community-frontend.vercel.app",
    "https://student-online-community-frontend.vercel.app/auth/",
    "https://student-online-community-frontend.vercel.app/auth/login",
    "https://student-online-community-frontend.vercel.app/auth/register",
    "https://student-online-community-frontend.vercel.app/auth/admin/login",
    "https://student-online-community-frontend.vercel.app/channels",
    "https://student-online-community-frontend.vercel.app/channelDashboard",
    "*"
  ],
  credentials: true,
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
connectDB();

io.on('connection', (socket) => {
  console.log("connected!!" + socket.id);

  socket.on('disconnect', () => {
    console.log('Disconnected' + socket.id);
  })
})

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/channels', channelRoutes);
app.use('/api/moderator', moderatorRoutes);


app.use(notFound);
app.use(errorHandler);

httpServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
