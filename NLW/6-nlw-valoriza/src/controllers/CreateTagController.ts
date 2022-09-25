import { Request, Response } from 'express';

import { CreateTagService } from '../services/CreateTagService';

import { IController } from './IController';

export class CreateTagController implements IController {
	async handle(request: Request, response: Response) {
		const { name } = request.body;

		const createTagService = new CreateTagService();
		const tag = await createTagService.execute(name);

		response.json(tag);
	}
}
