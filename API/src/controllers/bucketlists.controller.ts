import { RequestHandler, Request, Response } from "express";
import bucketlist, { IBucketList } from "../models/bucketlists.model";
import { GetAllBucketlistItems, GetAllBucketlistItemsforID, GetBucketlistFromId } from "../services/bucketlists.service";
import { client } from './../config/redis'

export const getAllBucketlists: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const bucketlists = await GetAllBucketlistItems();

    res.status(200).json(bucketlists);
}

export const addBucketlistitem: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { isRefrence, referenceFrom, title, description, images, notes, deadline, status, privacy, userid } = req.body;


    if (isRefrence === undefined) {
        res.status(422).send({ message: 'isRefrence is required' });
        return
    }

    if (!userid) {
        res.status(422).send({ message: 'userid is required' });
        return
    }

    if (!deadline) {
        res.status(422).send({ message: 'deadline is required' });
        return
    }

    try {
        const isReferenceBool =
            isRefrence === true || isRefrence === 'true' || isRefrence === 1;

        const dataToSave = isReferenceBool
            ? {
                isRefrence: true,
                referenceFrom,
                deadline,
                status,
                privacy,
                userid,
            }
            : {
                title,
                description,
                images,
                notes,
                deadline,
                status,
                privacy,
                userid,
            };

        const newBucketlistItem = await bucketlist.create((dataToSave as IBucketList));

        res.status(201).json({
            message: 'Bucketlist item added successfully!',
            bucketlistItem: newBucketlistItem,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
}

export const getUsersBucketlist: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const user = (req as any).user;

    const userid = user._id;

    const bucketlistitems = await GetAllBucketlistItemsforID(userid);

    res.status(200).json(bucketlistitems);
}

export const getBucketlistbyId: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;

        // Try to get from Redis cache
        let bucketlistIteme = await client.get(id);
        let bucketlistItem;

        if (bucketlistIteme) {
            bucketlistItem = JSON.parse(bucketlistIteme);
            console.log(`Cache hit for ID: ${id}`);
        } else {
            bucketlistItem = await GetBucketlistFromId(id);

            if (!bucketlistItem) {
                res.status(404).json({ message: `Bucketlist item with ID ${id} not found.` });
                return;
            }

        }
        await client.set(id, JSON.stringify(bucketlistItem), { EX: 60 });

        res.status(200).json(bucketlistItem);
    } catch (error: any) {
        console.error('Error fetching bucketlist item:', error);
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};
