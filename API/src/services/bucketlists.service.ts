import bucketlist, { IBucketList } from "../models/bucketlists.model";

export async function GetAllBucketlistItems(): Promise<IBucketList[]> {
    const bucketlists = await bucketlist.find().lean();

    return bucketlists;
}

export async function GetAllBucketlistItemsforID(id: string): Promise<IBucketList[]> {
    const bucketlistitems = await bucketlist.find({ userid: id }).lean();

    return bucketlistitems;
}