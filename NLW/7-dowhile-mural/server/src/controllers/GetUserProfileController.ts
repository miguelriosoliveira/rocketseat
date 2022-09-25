import { Request, Response } from 'express';

import { GetUserProfileService } from '../services';

import { IController } from './IController';

export class GetUserProfileController implements IController {
	async handle(request: Request, response: Response) {
		const { user_id } = request;

		const service = new GetUserProfileService();
		const userProfile = await service.execute(user_id);

		return response.json(userProfile);
	}
}
