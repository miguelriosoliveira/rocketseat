import { getCustomRepository } from 'typeorm';

import { ComplimentsRepository } from '../repositories';

import { IService } from './IService';

export class ListUserReceivedComplimentsService implements IService {
	async execute(userId: string) {
		const complimentsRepository = getCustomRepository(ComplimentsRepository);
		const receivedCompliments = complimentsRepository.findByUserReceiverId(userId);
		return receivedCompliments;
	}
}
