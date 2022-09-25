import { classToPlain } from 'class-transformer';
import { getCustomRepository } from 'typeorm';

import { TagsRepository } from '../repositories';

import { IService } from './IService';

export class ListTagsService implements IService {
	async execute() {
		const tagsRepository = getCustomRepository(TagsRepository);
		const allTags = tagsRepository.findAll();
		return classToPlain(allTags);
	}
}
