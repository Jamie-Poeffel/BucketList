import User, { IUser } from '../models/user.model'
import { Response } from 'express';


export const GetAllUsers = async (): Promise<IUser[]> => {
    try {
        const users = await User.find().lean();
        return users;
    } catch (error) {
        console.error('Error fetching users from database:', error);
        throw new Error('Failed to fetch users');
    }
};

export const DeleteUser = async (res: Response, id: String) => {
    const result = await User.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User deleted successfully' });
}

export const GetUserCount = async (): Promise<Number> => {
    const users = await GetAllUsers();

    return users.length;
}

