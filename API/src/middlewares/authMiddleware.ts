import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import { config } from 'dotenv';
import User from '../models/user.model';

config();


export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const accessToken = req.cookies['access_token'];
    const refreshToken = req.cookies['refresh_token'];

    try {
        if (!accessToken && !refreshToken) {
            return res.status(401).json({ message: 'No tokens provided' });
        }

        if (accessToken) {
            const decodedAccessToken = jwt.verify(accessToken, process.env.JWT_SECRET as string) as { userId: string };
            const user = await User.findById(decodedAccessToken.userId);

            if (!user) {
                return res.status(401).json({ message: 'User does not exist' });
            }

            (req as any).user = user;
            return next();
        }

        if (refreshToken) {
            const decodedRefreshToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string) as { userId: string };
            const user = await User.findById(decodedRefreshToken.userId);

            if (!user) {
                return res.status(401).json({ message: 'User from refresh token does not exist' });
            }

            const token = jwt.sign(
                { userId: user._id, username: user.username, email: user.email },
                process.env.JWT_SECRET || 'your_jwt_secret',
                { expiresIn: '15m' }
            );


            res.cookie('auth_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 15 * 60 * 1000,
            });

            (req as any).user = user;

            return next();
        }

        return res.status(401).json({ message: 'Unauthorized' });

    } catch (error) {
        console.error('Auth error:', error);
        return res.status(401).json({ message: 'Invalid or expired tokens' });
    }
};
