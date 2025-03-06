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

export const getUserForId = async (id: string): Promise<IUser> => {
    const result = await User.findOne({ _id: id });

    return (result as IUser);
}

export async function isValidUrl(url: string): Promise<boolean> {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

export async function UpdateUser(id: string, options: { username: string, profilePicture: string, visibility: string, bio: string, socialLinks: { url: string, platform: string }[] }): Promise<IUser> {
    await User.updateOne({ _id: id }, { ...options });

    const user = await User.findOne({ _id: id });
    return (user as IUser);
}

export async function updateSocialLinks(
    currentLinks: { url: string; platform: string }[],
    addLinks: { url: string; platform: string }[],
    removePlatforms: string[]
): Promise<{ url: string; platform: string }[]> {
    let updatedLinks = currentLinks.filter(link => !removePlatforms.includes(link.platform));

    updatedLinks = [...updatedLinks, ...addLinks];

    return updatedLinks;
}

export async function validateSocialLinks(socialLinks: any): Promise<{ url: string; platform: string }[]> {
    if (!Array.isArray(socialLinks)) return [];

    return socialLinks
        .filter((link) =>
            typeof link === "object" &&
            typeof link.url === "string" &&
            typeof link.platform === "string" &&
            link.platform.trim() !== "" &&
            isValidUrl(link.url)
        )
        .map((link) => ({
            url: link.url.trim(),
            platform: link.platform.trim(),
        }));
}
