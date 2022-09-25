import { Request, Response } from 'express';

import { ListUserSentComplimentsService } from '../services';

import { IController } from './IController';

export class ListUserSentComplimentsController implements IController {
	async handle(request: Request, response: Response) {
		const { user_id } = request;

		const listUserSentComplimentsService = new ListUserSentComplimentsService();
		const sentCompliments = await listUserSentComplimentsService.execute(user_id);

		response.json(sentCompliments);
	}
}
