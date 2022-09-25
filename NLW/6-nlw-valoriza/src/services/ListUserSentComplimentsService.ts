import { getCustomRepository } from 'typeorm';

import { ComplimentsRepository } from '../repositories';

import { IService } from './IService';

export class ListUserSentComplimentsService implements IService {
	async execute(userId: string) {
		const complimentsRepository = getCustomRepository(ComplimentsRepository);
		const sentCompliments = complimentsRepository.findByUserSenderId(userId);
		return sentCompliments;
	}
}
