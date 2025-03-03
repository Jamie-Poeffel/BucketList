import { Request, Response, NextFunction } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: "Authorization token is missing" });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Token is missing" });
    }

    try {
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
