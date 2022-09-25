import { NextFunction, Request, Response } from 'express';

import { logger } from '../utils/logger';

export function routeLogger(request: Request, response: Response, next: NextFunction) {
	logger.info(`[${request.method}] ${request.url}`);
	next();
}
