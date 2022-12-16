import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { NotificationNotFoundError } from './errors/notification-not-found-error';

@Injectable()
export class ReadNotification {
	constructor(private notificationsRepository: NotificationsRepository) {}

	async execute(notificationId: string) {
		const notification = await this.notificationsRepository.findById(notificationId);
		if (!notification) {
			throw new NotificationNotFoundError();
		}
		notification.read();
		await this.notificationsRepository.save(notification);
	}
}
