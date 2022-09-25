import { getCustomRepository } from 'typeorm';

import { AppError } from '../errors/AppError';
import { ComplimentsRepository, TagsRepository, UsersRepository } from '../repositories';

import { IService } from './IService';

interface IComplimentData {
	user_sender_id: string;
	user_receiver_id: string;
	tag_id: string;
	message: string;
}

export class CreateComplimentService implements IService {
	async execute({ user_sender_id, user_receiver_id, tag_id, message }: IComplimentData) {
		if (user_sender_id === user_receiver_id) {
			throw new AppError('User cannot create a self compliment!', 403);
		}

		const complimentsRepository = getCustomRepository(ComplimentsRepository);
		const usersRepository = getCustomRepository(UsersRepository);
		const tagsRepository = getCustomRepository(TagsRepository);

		const userSender = await usersRepository.findById(user_sender_id);
		if (!userSender) {
			throw new AppError('User sender not found!', 404);
		}

		const userReceiver = await usersRepository.findById(user_receiver_id);
		if (!userReceiver) {
			throw new AppError('User receiver not found!', 404);
		}

		const tag = await tagsRepository.findById(tag_id);
		if (!tag) {
			throw new AppError('Tag not found!', 404);
		}

		const compliment = complimentsRepository.create({
			user_sender_id,
			user_receiver_id,
			tag_id,
			message,
		});
		await complimentsRepository.save(compliment);

		return compliment;
	}
}
