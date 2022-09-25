import { Request, Response } from 'express';

import { GetLast3MessagesService } from '../services';

import { IController } from './IController';

export class GetLast3MessagesController implements IController {
	async handle(request: Request, response: Response) {
		const service = new GetLast3MessagesService();
		const last3Messages = await service.execute();

		return response.json(last3Messages);
	}
}
