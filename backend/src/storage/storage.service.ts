import { Injectable } from '@nestjs/common';
import { Multer } from 'multer';
import { createS3Client } from './s3.client';
import { config } from '@/config';
import { randomUUID } from 'crypto';
import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class StorageService {
  private client = createS3Client();
  private bucket = config.fileSystem.s3.bucket;

  async uploadFile(
    file: Multer.File,
    folder: string,
    slug?: string,
  ): Promise<string> {
    const extension = file.originalname.split('.').pop();
    const key = `${folder}/${slug ?? randomUUID()}.${extension}`;

    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
      }),
    );

    const baseUrl = config.fileSystem.s3.url;
    return `${baseUrl}/${key}`;
  }

  async deleteFile(fileUrl: string): Promise<void> {
    const key = fileUrl.replace(`${config.fileSystem.s3.url}/`, '');

    if (!key) {
      await this.client.send(
        new DeleteObjectCommand({
          Bucket: this.bucket,
          Key: key,
        }),
      );
    }
  }
}
