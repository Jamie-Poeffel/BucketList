import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();  // Load environment variables (e.g., JWT_SECRET)

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const accessToken = req.cookies['auth_token'];  // Retrieve access token from cookies
    const refreshToken = req.cookies['refresh_token'];  // Retrieve refresh token from cookies

    // If no access token, return 401
    if (!accessToken) {
        res.status(401).json({ message: 'Access token is missing' });
        return
    }

    try {
        // Verify the access token
        const decodedAccessToken = jwt.verify(accessToken, process.env.JWT_SECRET as string);
        // Typecast `req` as `any` and attach `user`
        (req as any).user = decodedAccessToken;  // Attach the decoded user info to the request
    } catch (error) {
        // If the access token is invalid or expired, check the refresh token
        if (!refreshToken) {
            res.status(401).json({ message: 'Access and refresh tokens are missing or invalid' });
            return
        }

        try {
            // Verify the refresh token (you might need a separate secret for this)
            const decodedRefreshToken = jwt.verify(refreshToken, process.env.JWT_SECRET as string);
            // Typecast `req` as `any` and attach `refreshToken`
            (req as any).refreshToken = decodedRefreshToken;  // Attach the decoded refresh token to the request

            // Optionally, implement logic to refresh the access token here if needed
            res.status(401).json({ message: 'Access token expired, please use refresh token' });
            return
        } catch (error) {
            res.status(401).json({ message: 'Invalid or expired refresh token' });
            return
        }
    }

    // If the access token is valid, move to the next middleware or route handler
    next();  // Continue to the next middleware
};
