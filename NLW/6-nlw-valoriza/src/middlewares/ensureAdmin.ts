import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';

import { AppError } from '../errors/AppError';
import { UsersRepository } from '../repositories/UsersRepository';

export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
	const { user_id } = request;

	const usersRepository = getCustomRepository(UsersRepository);
	const user = await usersRepository.findById(user_id);
	if (!user) {
		throw new AppError('User not found', 404);
	}

	if (!user.admin) {
		throw new AppError('User is not admin!', 401);
	}

	next();
}
