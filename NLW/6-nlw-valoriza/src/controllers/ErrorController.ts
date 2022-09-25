import { Request, Response, NextFunction } from 'express';

import { AppError } from '../errors/AppError';

export class ErrorController {
	handle(err: Error, _request: Request, response: Response, _next: NextFunction) {
		if (err instanceof AppError) {
			return response.status(err.statusCode).json({ status: 'error', message: err.message });
		}
		// eslint-disable-next-line no-console
		console.error(err);
		return response.status(500).json({ status: 'error', message: 'Internal Server Error' });
	}
}
