import { S3 } from 'aws-sdk';
import { config } from 'dotenv';
config();

const s3 = new S3({
    endpoint: 'http://localhost:9000',
    s3ForcePathStyle: true,
    signatureVersion: 'v4',
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    region: 'eu-central-1',
});

export default s3;