import { Request, Response, RequestHandler } from 'express';
import { GetAllUsers, DeleteUser, GetUserCount } from '../services/user.service';

export const getUsers: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await GetAllUsers();
        res.status(200).json(users);  // You modify the response here
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Failed to fetch users', error: error });
    }
};

export const deleteUser: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;

        await DeleteUser(res, id);
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Failed to delete user', error: error });
    }
}
export const getUserCount: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const count = await GetUserCount();
    res.json({ count: count });
}
