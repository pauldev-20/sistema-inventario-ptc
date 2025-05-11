// storage/s3-client.ts
import { config } from '@/config';
import { S3Client } from '@aws-sdk/client-s3';

export const createS3Client = () =>
  new S3Client({
    region: config.fileSystem.s3.region,
    endpoint: config.fileSystem.s3.endpoint,
    credentials: {
      accessKeyId: config.fileSystem.s3.accessKeyId,
      secretAccessKey: config.fileSystem.s3.secretAccessKey,
    },
    forcePathStyle: config.fileSystem.s3.usePathStyleEndpoint,
  });
