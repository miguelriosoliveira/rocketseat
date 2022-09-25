import { Request, Response } from 'express';

import { CreateUserService } from '../services/CreateUserService';

import { IController } from './IController';

export class CreateUserController implements IController {
	async handle(request: Request, response: Response) {
		const { name, email, password, admin } = request.body;

		const createUserService = new CreateUserService();
		const user = await createUserService.execute({ name, email, password, admin });

		response.json(user);
	}
}
