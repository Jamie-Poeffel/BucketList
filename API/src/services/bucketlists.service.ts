import bucketlist, { IBucketList } from "../models/bucketlists.model";
import { client } from "../config/redis";

export async function GetAllBucketlistItems(): Promise<IBucketList[]> {
    const bucketlists = await bucketlist.find().lean();

    bucketlists.forEach(async (e) => {
        await client.set(`${e._id}`, `${(await bucketlist.findOne({ _id: e._id }) as IBucketList)}`);
    });

    return bucketlists;
}
export async function GetAllBucketlistItemsforID(id: string): Promise<IBucketList[]> {
    const bucketlistitems = await bucketlist.find({ userid: id }).lean();

    return bucketlistitems;
}

export async function GetBucketlistFromId(id: string): Promise<IBucketList> {
    const bucketlistItem = await bucketlist.findOne<IBucketList>({ _id: id });

    return (bucketlistItem as IBucketList);
}