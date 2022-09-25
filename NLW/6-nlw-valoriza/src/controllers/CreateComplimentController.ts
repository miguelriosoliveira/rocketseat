import { Request, Response } from 'express';

import { CreateComplimentService } from '../services/CreateComplimentService';

import { IController } from './IController';

export class CreateComplimentController implements IController {
	async handle(request: Request, response: Response) {
		const { user_id } = request;
		const { user_receiver_id, tag_id, message } = request.body;

		const createComplimentService = new CreateComplimentService();
		const compliment = await createComplimentService.execute({
			user_sender_id: user_id,
			user_receiver_id,
			tag_id,
			message,
		});

		response.json(compliment);
	}
}
