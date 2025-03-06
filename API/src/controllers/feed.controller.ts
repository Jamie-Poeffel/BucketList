import { Response, Request, RequestHandler } from "express";

const totalItems = 50;
const feedData = Array.from({ length: totalItems }, (_, i) => ({
    id: i + 1,
    message: `Feed item #${i + 1}`,
    timestamp: new Date().toISOString(),
}));

const userProgress: Record<string, number> = {};
const clients: Record<string, Response> = {};

export const feed: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const userId = req.ip || '';

    if (!userProgress[userId]) userProgress[userId] = 0;
    clients[userId] = res;

    sendBatch(userId);

    req.on("close", () => {
        delete clients[userId];
    });
}

export const more: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const userId = req.ip || '';

    if (!clients[userId]) {
        res.status(400).json({ error: "User not connected to /feed" });
        return
    }

    sendBatch(userId);

    res.json({ message: "New data sent" });
}

function sendBatch(userId: string) {
    const batchSize = 10;
    const startIndex = userProgress[userId];

    if (startIndex >= totalItems) {
        clients[userId]?.write(`data: ${JSON.stringify({ message: "No more updates" })}\n\n`);
        return;
    }

    const batch = feedData.slice(startIndex, startIndex + batchSize);
    userProgress[userId] += batchSize;

    clients[userId]?.write(`data: ${JSON.stringify(batch)}\n\n`);
}