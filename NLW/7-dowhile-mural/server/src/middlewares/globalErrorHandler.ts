import { NextFunction, Request, Response } from 'express';

import { AppError } from '../errors';
import { logger } from '../utils/logger';

export function globalErrorHandler(
	err: Error,
	_request: Request,
	response: Response,
	_: NextFunction,
) {
	logger.error(err);

	if (err instanceof AppError) {
		return response.status(err.statusCode).json({ status: 'error', message: err.message });
	}

	return response.status(500).json({ status: 'error', message: 'Internal Server Error' });
}
