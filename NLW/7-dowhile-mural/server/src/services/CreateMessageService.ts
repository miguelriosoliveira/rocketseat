import { socketServer } from '../app';
import { prismaClient } from '../prisma';

import { IService } from './IService';

interface IParams {
	text: string;
	userId: string;
}

export class CreateMessageService implements IService {
	async execute({ text, userId }: IParams) {
		const message = await prismaClient.message.create({
			data: {
				text,
				user_id: userId,
			},
			include: {
				user: true,
			},
		});

		socketServer.emit('new-message', {
			id: message.id,
			text: message.text,
			user_id: message.user_id,
			created_at: message.created_at,
			user: {
				name: message.user.name,
				avatar_url: message.user.avatar_url,
			},
		});

		return message;
	}
}
