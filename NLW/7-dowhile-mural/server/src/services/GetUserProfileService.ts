import { prismaClient } from '../prisma';

import { IService } from './IService';

export class GetUserProfileService implements IService {
	async execute(userId: string) {
		const userProfile = await prismaClient.user.findUnique({ where: { id: userId } });

		return userProfile;
	}
}
