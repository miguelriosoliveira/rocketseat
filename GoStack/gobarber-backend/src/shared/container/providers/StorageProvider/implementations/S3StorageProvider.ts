import aws from 'aws-sdk';
import fs from 'fs';
import mime from 'mime';
import path from 'path';

import uploadConfig from '@config/storage';
import storageConfig from '@config/storage';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

export default class S3StorageProvider implements IStorageProvider {
	private client: aws.S3;

	constructor() {
		this.client = new aws.S3({
			region: process.env.AWS_DEFAULT_REGION,
		});
	}

	public async saveFile(file: string): Promise<string> {
		const originalPath = path.resolve(uploadConfig.tmpFolder, file);

		const ContentType = mime.getType(originalPath);

		if (!ContentType) {
			throw new Error('File not found');
		}

		const fileContent = await fs.promises.readFile(originalPath);
		await this.client
			.putObject({
				Bucket: storageConfig.config.s3.bucket,
				Key: file,
				ACL: 'public-read',
				Body: fileContent,
				ContentType,
			})
			.promise();

		await fs.promises.unlink(originalPath);

		return file;
	}

	public async deleteFile(file: string): Promise<void> {
		await this.client
			.deleteObject({
				Bucket: storageConfig.config.s3.bucket,
				Key: file,
			})
			.promise();
	}
}
