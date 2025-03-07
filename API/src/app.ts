import express from 'express';
import userRoutes from './routes/user.route';
import authRoutes from './routes/auth.route';
import { connectDB } from './config/db';
import cookieParser from 'cookie-parser';
import feedRoutes from './routes/feed.route';
import bucketlistRoutes from './routes/bucketlists.route';
import publicRoutes from './routes/public.route'

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/feed', feedRoutes);
app.use('/bucketlists', bucketlistRoutes);
app.use('/public', publicRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server lÃ¤uft auf Port http://localhost:${PORT}`);
});

export default app;
