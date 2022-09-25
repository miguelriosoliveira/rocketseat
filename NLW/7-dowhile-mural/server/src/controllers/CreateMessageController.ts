import { Request, Response } from 'express';

import { CreateMessageService } from '../services';

import { IController } from './IController';

interface IRequest extends Request {
	body: {
		message: string;
	};
}

export class CreateMessageController implements IController {
	async handle(request: IRequest, response: Response) {
		const { user_id } = request;
		const { message } = request.body;

		const service = new CreateMessageService();
		const newMessage = await service.execute({
			text: message,
			userId: user_id,
		});

		return response.json(newMessage);
	}
}
