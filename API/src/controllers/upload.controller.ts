import { Request, Response } from "express";
import s3 from "../config/s3";
import { randomUUID } from "crypto";
import sharp from "sharp";
import User from "../models/user.model";

export const uploadProfilePicture = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).send("No file uploaded.");
            return
        }

        let mageName = randomUUID();

        if (!req.body.imageName) {
            mageName = randomUUID();
        } else {
            mageName = req.body.imageName;
        }

        const buffer = await sharp(req.file.buffer).resize({ height: 400, width: 400, fit: "contain" }).toBuffer();

        const params = {
            Bucket: process.env.S3_PROFILE_BUCKET as string,
            Key: mageName,
            Body: buffer,
            ContentType: req.file.mimetype,
        };

        await s3.upload(params).promise();


        const prm = {
            Bucket: process.env.S3_PROFILE_BUCKET as string,
            Key: mageName,
            Expires: 3600,
        };


        s3.getSignedUrl("getObject", prm, async (err, url) => {
            if (err) {
                console.error("Error generating signed URL", err);
                return res.status(500).json({ error: "Error generating signed URL" });
            }
            await User.findOneAndUpdate({ _id: (req as any).user._id }, { "profileInfo.profilePicture.profilePictureURI": url, "profileInfo.profilePicture.imageName": mageName });
        });


        const post = await User.findOne({ _id: (req as any).user._id });

        res.status(200).json({ msg: "File uploaded successfully!", data: post });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error uploading file.");
    }
};

export const deleteProfilePicture = async (req: Request, res: Response): Promise<void> => {
    const user = await User.findOne({ _id: (req as any).user._id });

    const bucket = process.env.S3_PROFILE_BUCKET as string;
    const imageName = user?.profileInfo.profilePicture?.imageName as string;

    const params = {
        Bucket: bucket,
        Key: imageName,
    };

    s3.deleteObject(params, (err, data) => {
        if (err) {
            console.error("Error deleting object:", err);
        } else {
            console.log("Object deleted successfully:", data);
        }
    });

    await User.findOneAndUpdate({ _id: (req as any).user._id }, { "profileInfo.profilePicture": {} })
    res.status(200).json({ message: "Object deleted successfully" });
}
