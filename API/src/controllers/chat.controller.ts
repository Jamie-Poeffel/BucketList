import { RequestHandler, Request, Response } from "express";
import Chat, { IChat, IMessages } from "../models/chat.model";
import User from "../models/user.model";

export const addChat: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { users } = req.body;

    if (!Array.isArray(users) || users.length === 0) {
        res.status(422).json({ message: "No chat added because it has no users" });
        return;
    }

    try {
        const userList = await Promise.all(
            users.map(async (e) => {
                const user = await User.findOne({ username: e.username }, { _id: 1 });
                if (!user) {
                    return null;
                }
                return { id: user._id, username: e.username };
            })
        );

        const validUsers = userList.filter((user) => user !== null);
        if (validUsers.length === 0) {
            res.status(404).json({ message: "No valid users found. Chat not created." });
            return;
        }

        const chat = await Chat.create({ users: validUsers });

        res.status(201).json({ message: "Chat created successfully", chat });
    } catch (error: any) {
        console.error("Error adding chat:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getChatHistory: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;

    const chat: IChat | null = await Chat.findOne(
        { _id: id },
        { messages: true }
    );

    res.status(200).json(chat);
}


export const streamChat: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const chatId = req.params.id;

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    let lastMessageTimestamp = new Date(0);

    const sendNewMessages = async () => {
        try {
            // Typisierung sicherstellen
            const chat: IChat | null = await Chat.findOne(
                { _id: chatId },
                { messages: true }
            );

            if (!chat) {
                res.write(`event: error\ndata: ${JSON.stringify({ message: "Chat not found." })}\n\n`);
                return;
            }

            // Filtere neue Nachrichten basierend auf dem Timestamp
            const newMessages: IMessages[] = chat.messages.filter(
                (msg) => new Date(msg.timestamp) > lastMessageTimestamp
            );

            if (newMessages.length > 0) {
                res.write(`data: ${JSON.stringify(newMessages)}\n\n`);
                // Aktualisiere den Timestamp
                lastMessageTimestamp = new Date(newMessages[newMessages.length - 1].timestamp);
            }
        } catch (error) {
            console.error("Error streaming chat:", error);
            res.write(`event: error\ndata: ${JSON.stringify({ message: "Error streaming chat" })}\n\n`);
        }
    };

    const dynamicPolling = async () => {
        while (!res.writableEnded) {
            await sendNewMessages();
            await new Promise((resolve) => setTimeout(resolve, 2000));
        }
    };

    dynamicPolling();

    req.on("close", () => {
        console.log("Client disconnected from SSE");
        res.end();
    });
};


export const sendMessage: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const userid = (req as any).user._id;
        const { message, links } = req.body;

        if (!message) {
            res.status(400).json({ error: "Message content is required." });
            return;
        }

        if (links && !Array.isArray(links)) {
            res.status(400).json({ error: "Links must be an array." });
            return;
        }

        const newMessage: IMessages = {
            sender: userid,
            content: message,
            timestamp: new Date(),
            ...(links && { links })
        };

        const chat = await Chat.findOneAndUpdate(
            { _id: id },
            { $push: { messages: newMessage } },
            { new: true }
        );

        if (!chat) {
            res.status(404).json({ error: "Chat not found." });
            return;
        }

        res.status(200).json(chat);
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ error: "An error occurred while sending the message." });
    }
};

export const deleteMessage: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const chatId = req.params.chatId;
    const messageId = req.params.messageId;

    try {
        const chat = await Chat.findOneAndUpdate(
            { _id: chatId },
            { $pull: { messages: { _id: messageId } } },
            { new: true }
        );

        if (!chat) {
            res.status(404).json({ error: "Chat not found." });
            return;
        }

        res.status(200).json({ message: "Message deleted successfully.", chat });
    } catch (error) {
        console.error("Error deleting message:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};

