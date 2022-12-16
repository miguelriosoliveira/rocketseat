import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';

@Injectable()
export class CountRecipientNotifications {
	constructor(private notificationsRepository: NotificationsRepository) {}

	async execute(recipientId: string) {
		const count = await this.notificationsRepository.countManyByRecipientId(recipientId);
		return { count };
	}
}
