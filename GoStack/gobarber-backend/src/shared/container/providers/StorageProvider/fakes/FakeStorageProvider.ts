import { formatRFC3339WithOptions } from 'date-fns/fp';

import IStorageProvider from '../models/IStorageProvider';

class FakeStorageProvider implements IStorageProvider {
	private storage: string[] = [];

	public async saveFile(file: string): Promise<string> {
		this.storage.push(file);
		return file;
	}

	public async deleteFile(file: string): Promise<void> {
		this.storage = this.storage.filter(file_ => file_ !== file);
	}
}

export default FakeStorageProvider;
