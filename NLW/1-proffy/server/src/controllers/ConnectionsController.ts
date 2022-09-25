import { Response, Request } from 'express';

import db from '../database/connection';

export default class ConnectionsController {
	async index(request: Request, response: Response): Promise<Response> {
		const totalConnections = await db('connections').count('* as total');
		const { total } = totalConnections[0];
		return response.json({ total });
	}

	async create(request: Request, response: Response): Promise<Response> {
		const { user_id } = request.body;

		const insertedConnectionId = await db('connections').insert({ user_id });

		return response.json({ insertedConnectionId });
	}
}
