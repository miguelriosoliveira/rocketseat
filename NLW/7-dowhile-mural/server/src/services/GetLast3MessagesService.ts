import { prismaClient } from '../prisma';

import { IService } from './IService';

export class GetLast3MessagesService implements IService {
	async execute() {
		const messages = await prismaClient.message.findMany({
			take: 3,
			orderBy: { created_at: 'desc' },
			include: { user: true },
		});

		return messages;
	}
}
