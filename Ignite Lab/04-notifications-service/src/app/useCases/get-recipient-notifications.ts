import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';

@Injectable()
export class GetRecipientNotifications {
	constructor(private notificationsRepository: NotificationsRepository) {}

	async execute(recipientId: string) {
		const notifications = await this.notificationsRepository.findManyByRecipientId(recipientId);
		return { notifications };
	}
}
