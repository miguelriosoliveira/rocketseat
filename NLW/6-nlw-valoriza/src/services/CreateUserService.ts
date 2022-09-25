import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';

import { AppError } from '../errors/AppError';
import { UsersRepository } from '../repositories/UsersRepository';

import { IService } from './IService';

interface IUserData {
	name: string;
	email: string;
	password: string;
	admin?: boolean;
}

export class CreateUserService implements IService {
	async execute({ name, email, password, admin }: IUserData) {
		if (!name) {
			throw new AppError('Invalid name!');
		}

		if (!email) {
			throw new AppError('Invalid e-mail!');
		}

		if (!password) {
			throw new AppError('Invalid password!');
		}

		const usersRepository = getCustomRepository(UsersRepository);

		const userExists = await usersRepository.findByEmail(email);
		if (userExists) {
			throw new AppError('E-mail already in use!', 403);
		}

		const passwordHash = await hash(password, 8);

		const user = usersRepository.create({ name, email, password: passwordHash, admin });
		await usersRepository.save(user);

		return user;
	}
}
