import express from 'express';
import userRoutes from './routes/user.route';
import authRoutes from './routes/auth.route';
import { connectDB } from './config/db';
import cookieParser from 'cookie-parser';
import feedRoutes from './routes/feed.route';
import bucketlistRoutes from './routes/bucketlists.route';
import publicRoutes from './routes/public.route'
import chatRoutes from './routes/chat.route';
import { connectRedis } from './config/redis';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/feed', feedRoutes);
app.use('/bucketlists', bucketlistRoutes);
app.use('/public', publicRoutes);
app.use('/chat', chatRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    await connectDB();
    await connectRedis();
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
