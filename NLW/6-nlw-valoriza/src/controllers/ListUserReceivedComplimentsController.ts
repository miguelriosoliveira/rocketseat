import { Request, Response } from 'express';

import { ListUserReceivedComplimentsService } from '../services';

import { IController } from './IController';

export class ListUserReceivedComplimentsController implements IController {
	async handle(request: Request, response: Response) {
		const { user_id } = request;

		const listUserReceivedComplimentsService = new ListUserReceivedComplimentsService();
		const receivedCompliments = await listUserReceivedComplimentsService.execute(user_id);

		response.json(receivedCompliments);
	}
}
