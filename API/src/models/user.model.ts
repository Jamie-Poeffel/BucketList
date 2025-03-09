import mongoose, { Document, Schema } from 'mongoose';

export enum Visibility {
    PUBLIC = "public",
    PRIVATE = "private",
    FRIENDS_ONLY = "friends_only",
}

export interface IUser extends Document {
    _id: string;
    firstName: string;
    lastName: string;
    fullName?: string;
    username: string;
    email: string;
    password: string;
    profileInfo: {
        profilePicture?: string;
        visibility: Visibility;
        bio?: string;
        socialLinks?: {
            platform: string;
            url: string;
        }[];
    };
    isActive: boolean;
}

interface ISocialLinks {
    platform: string,
    url: string
}

interface IProfileInfo {
    profilePicture?: string,
    visibility: Visibility,
    bio?: string,
    socialLinks?: ISocialLinks[],
}

const socialLinkSchema = new Schema<ISocialLinks>({
    platform: { type: String, required: true },
    url: { type: String, required: true },
}, { _id: false });

const profileInfoSchema = new Schema<IProfileInfo>({
    profilePicture: { type: String },
    visibility: {
        type: String,
        enum: Object.values(Visibility),
        default: Visibility.PRIVATE
    },
    bio: { type: String },
    socialLinks: [socialLinkSchema],
}, { _id: false });

const userSchema = new mongoose.Schema<IUser>({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    fullName: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    profileInfo: profileInfoSchema,
}, { timestamps: true });

export default mongoose.model<IUser>('User', userSchema);
