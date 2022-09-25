import { Request, Response } from 'express';

interface IRequest extends Request {
	query: never;
}

export interface IController {
	handle: (request: IRequest, response: Response) => Promise<Response>;
}
