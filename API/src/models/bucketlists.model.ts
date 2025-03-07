import mongoose, { Document, Schema } from 'mongoose';
import { Visibility } from './user.model';

export enum Status {
    COMPLETE = "completed",
    INCOMPLETE = "incompleted",
}

export interface IBucketList extends Document {
    _id: string,
    isRefrence: boolean,
    referenceFrom?: string,
    title?: string,
    description?: string,
    images?: Array<{ url: string }>
    notes?: string[]
    deadline: Date,
    status: Status,
    privacy: Visibility,
    userid: string,
}

const bucketListSchema = new Schema<IBucketList>({
    isRefrence: {
        type: Boolean,
        required: true,
        default: false
    },
    referenceFrom: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    images: {
        type: [{
            url: { type: String, required: true }
        }],
        required: false,
        default: []
    },
    notes: {
        type: [String],
        required: false,
        default: []
    },
    deadline: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(Status),
        default: Status.INCOMPLETE
    },
    privacy: {
        type: String,
        enum: Object.values(Visibility),
        default: Visibility.PUBLIC
    },
    userid: {
        type: String,
        required: true,
    }
}, { timestamps: true });

export default mongoose.model<IBucketList>('BucketList', bucketListSchema);
