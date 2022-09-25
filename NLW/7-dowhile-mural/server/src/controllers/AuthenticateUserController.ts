import { Request, Response } from 'express';

import { AuthenticateUserService } from '../services';

import { IController } from './IController';

interface IRequest extends Request {
	body: {
		code: string;
		client_type: 'server' | 'web' | 'mobile';
	};
}

export class AuthenticateUserController implements IController {
	async handle(request: IRequest, response: Response) {
		const { code, client_type } = request.body;

		const service = new AuthenticateUserService();
		const accessToken = await service.execute({ code, client_type });

		return response.json(accessToken);
	}
}
