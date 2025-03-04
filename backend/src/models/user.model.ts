import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    _id: string,
    name: string;
    Lastname: string;
    fullname: string;
    username: string;
    email: string;
    password: string;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    Lastname: {
        type: String,
        required: true,
        trim: true,
    },
    fullname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
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
});

export default mongoose.model<IUser>('User', userSchema);
