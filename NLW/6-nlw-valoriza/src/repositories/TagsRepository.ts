import { EntityRepository, Repository } from 'typeorm';

import { Tag } from '../entities/Tag';

@EntityRepository(Tag)
export class TagsRepository extends Repository<Tag> {
	async findById(id: string) {
		return this.findOne(id);
	}

	async findByName(name: string) {
		return this.findOne({ name });
	}

	async findAll() {
		return this.find();
	}
}
