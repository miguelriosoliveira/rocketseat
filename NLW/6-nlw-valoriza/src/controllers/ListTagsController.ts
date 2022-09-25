import { Request, Response } from 'express';

import { ListTagsService } from '../services';

import { IController } from './IController';

export class ListTagsController implements IController {
	async handle(request: Request, response: Response) {
		const listTagsService = new ListTagsService();
		const allTags = await listTagsService.execute();
		response.json(allTags);
	}
}
