import { Request, Response } from 'express';

import { ListUsersService } from '../services/ListUsersService';

import { IController } from './IController';

export class ListUsersController implements IController {
	async handle(request: Request, response: Response) {
		const listUsersService = new ListUsersService();
		const allUsers = await listUsersService.execute();
		response.json(allUsers);
	}
}
