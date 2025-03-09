import { RequestHandler, Request, Response } from "express";
import { getUserForId, updateSocialLinks, validateSocialLinks, UpdateUser } from "../services/user.service";
import { Visibility } from "../models/user.model";
import s3 from './../config/s3'
import User from "../models/user.model";

export const getUserProfile: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const user = (req as any).user;
    if (user.profileInfo.profilePicture?.imageName) {
        const params = {
            Bucket: process.env.S3_PROFILE_BUCKET as string,
            Key: user.profileInfo.profilePicture?.imageName,
            Expires: 3600,
        };

        s3.getSignedUrl("getObject", params, async (err, url) => {
            if (err) {
                console.error("Error generating signed URL", err);
                return res.status(500).json({ error: "Error generating signed URL" });
            }
            await User.findOneAndUpdate({ _id: user._id }, { "profileInfo.profilePicture.profilePictureURI": url });
        });
    }

    res.json({ id: user._id, username: user.username, profileinfo: user.profileInfo });
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

    res.status(200).json({ id: updatedUser._id, username: updatedUser.username, profileinfo: updatedUser.profileInfo });
}

export const getSpecificUser: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id

    const user = await getUserForId(id);

    res.json({ id: user._id, username: user.username, profileinfo: user.profileInfo });
}