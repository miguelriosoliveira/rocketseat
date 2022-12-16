import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { NotificationNotFoundError } from './errors/notification-not-found-error';

@Injectable()
export class UnreadNotification {
	constructor(private notificationsRepository: NotificationsRepository) {}

	async execute(notificationId: string) {
		const notification = await this.notificationsRepository.findById(notificationId);
		if (!notification) {
			throw new NotificationNotFoundError();
		}
		notification.unread();
		await this.notificationsRepository.save(notification);
	}
}
