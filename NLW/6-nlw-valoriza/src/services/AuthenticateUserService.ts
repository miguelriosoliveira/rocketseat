import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';

import { AppError } from '../errors/AppError';
import { UsersRepository } from '../repositories';

import { IService } from './IService';

interface IUserData {
	email: string;
	password: string;
}

export class AuthenticateUserService implements IService {
	async execute({ email, password }: IUserData) {
		const usersRepository = getCustomRepository(UsersRepository);

		const user = await usersRepository.findByEmail(email);
		if (!user) {
			throw new AppError('Invalid e-mail/password combination!', 401);
		}

		const passwordMatch = await compare(password, user.password);
		if (!passwordMatch) {
			throw new AppError('Invalid e-mail/password combination!', 401);
		}

		const token = sign({ email }, process.env.JWT_SECRET, { subject: user.id, expiresIn: '1d' });
		return token;
	}
}
