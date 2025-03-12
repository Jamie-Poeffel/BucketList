import mongoose, { Document, Schema } from 'mongoose';

export interface IChat extends Document {
    users: [IUsers],
    name: string,
    messages: [IMessages]
}

interface IUsers {
    id: string,
    username: string,
}

export interface IMessages {
    sender: string,
    content: string,
    timestamp: Date,
    links?: [Ilinks]
}

interface Ilinks {
    url: string,
    name: string
}
const usersSchema = new Schema<IUsers>({
    id: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true
    }
}, { "_id": false })

const linkSchema = new Schema<Ilinks>({
    url: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    }
}, { "_id": false })

const messagesSchema = new Schema<IMessages>({
    sender: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true,
    },
    links: { type: [linkSchema], required: false }
})

const chatSchema = new Schema<IChat>({
    users: [usersSchema],
    name: { type: String, required: true },
    messages: { type: [messagesSchema], required: false },
})

export default mongoose.model<IChat>('chat', chatSchema);