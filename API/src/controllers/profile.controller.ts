import { RequestHandler, Request, Response } from "express";
import { getUserForId, updateSocialLinks, validateSocialLinks, UpdateUser } from "../services/user.service";
import { Visibility } from "../models/user.model";

export const getUserProfile: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const user = (req as any).user;

    res.json({ username: user.username, profileinfo: user.profileInfo });
}

export const putUserProfile: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const user = (req as any).user;

    const { username, profilePicture, visibility, bio, socialLinks, rmsocialLinks } = req.body;

    if (!username && !profilePicture && !visibility && !bio && !socialLinks && !rmsocialLinks) {
        res.status(422).json({ message: 'no changes found' });
        return
    }

    const newVisibility = Object.values(Visibility).includes(visibility) ? visibility : user.profileInfo.visibility;

    const validNewSocialLinks = await validateSocialLinks(socialLinks);

    const removePlatforms = Array.isArray(rmsocialLinks)
        ? rmsocialLinks.filter(p => typeof p === "string").map(p => p.trim())
        : [];

    const updatedSocialLinks = await updateSocialLinks(user.profileInfo.socialLinks, validNewSocialLinks, removePlatforms);


    const updatedUser = await UpdateUser(user._id, {
        username: typeof username === "string" ? username.trim() : user.username,
        profilePicture: typeof profilePicture === "string" ? profilePicture.trim() : user.profileInfo.profilePicture,
        visibility: newVisibility,
        bio: typeof bio === "string" ? bio.trim() : user.profileInfo.bio,
        socialLinks: updatedSocialLinks,
    });

    res.status(200).json({ username: updatedUser.username, profileinfo: updatedUser.profileInfo });
}

export const getSpecificUser: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id

    const user = await getUserForId(id);

    res.json({ username: user.username, profileinfo: user.profileInfo });
}