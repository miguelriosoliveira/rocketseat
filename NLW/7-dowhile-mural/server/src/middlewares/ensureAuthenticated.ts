import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '../errors';

interface IPayload {
	sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
	const { authorization: authToken } = request.headers;

	if (!authToken) {
		throw new AppError('Invalid token', 401);
	}

	const [, token] = authToken.split(' ');

	try {
		const { sub: userId } = verify(token, process.env.JWT_SECRET) as IPayload;
		request.user_id = userId;
	} catch (error) {
		throw new AppError('Expired token', 401);
	}

	next();
}
