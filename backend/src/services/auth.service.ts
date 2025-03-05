import User, { IUser } from '../models/user.model';
import { Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function authenticateUser(res: Response, username: string, password: string): Promise<void> {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zAZ0-9.-]+$/;

    try {
        let user: IUser | null;

        if (emailRegex.test(username)) {
            user = await User.findOne({ email: username });
        } else {
            user = await User.findOne({ username: username });
        }

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid password' });
            return;
        }

        const token = jwt.sign(
            { userId: user._id, username: user.username, email: user.email },
            process.env.JWT_SECRET || 'your_jwt_secret',
            { expiresIn: '1d' }
        );

        const refreshtoken = jwt.sign(
            { userId: user._id, username: user.username, email: user.email },
            process.env.JWT_REFRESH_SECRET || 'your_jwt_secret',
            { expiresIn: '1y' }
        )

        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000,
            sameSite: 'lax',
        });

        res.status(200).json({ message: 'Authentication successful' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error });
    }
}
