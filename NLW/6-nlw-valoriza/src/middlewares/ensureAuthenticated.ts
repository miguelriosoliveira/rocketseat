import { NextFunction, Request, Response } from 'express';
import { verify, JwtPayload } from 'jsonwebtoken';

import { AppError } from '../errors/AppError';

export async function ensureAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction,
) {
	const { authorization } = request.headers;
	if (!authorization) {
		throw new AppError('Authorization needed', 401);
	}
	const [, token] = authorization.split(' ');

	let decoded = null;
	try {
		decoded = verify(token, process.env.JWT_SECRET);
	} catch {
		throw new AppError('Invalid JWT token', 401);
	}

	const { sub: userId } = decoded as JwtPayload;
	request.user_id = userId;

	next();
}
