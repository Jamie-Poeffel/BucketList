import express from 'express';
import userRoutes from './routes/user.route';
import authRoutes from './routes/auth.route';

const app = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server lÃ¤uft auf Port http://localhost:${PORT}`);
});

export default app;
