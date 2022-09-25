import { classToPlain } from 'class-transformer';
import { getCustomRepository } from 'typeorm';

import { UsersRepository } from '../repositories';

import { IService } from './IService';

export class ListUsersService implements IService {
	async execute() {
		const usersRepository = getCustomRepository(UsersRepository);
		const allUsers = usersRepository.findAll();
		return classToPlain(allUsers);
	}
}
