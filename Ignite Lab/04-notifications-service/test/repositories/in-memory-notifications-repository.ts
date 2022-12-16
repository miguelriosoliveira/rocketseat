import { Notification } from '@app/entities/notification';
import { NotificationsRepository } from '@app/repositories/notifications-repository';

export class InMemoryNotificationsRepository implements NotificationsRepository {
	public notifications: Notification[] = [];

	async findById(notificationId: string) {
		const notification = this.notifications.find(
			notification => notification.id === notificationId,
		);
		return notification || null;
	}

	async findManyByRecipientId(recipientId: string) {
		const recipientNotifications = this.notifications.filter(
			notification => notification.recipientId === recipientId,
		);
		return recipientNotifications;
	}

	async countManyByRecipientId(recipientId: string) {
		const recipientNotifications = this.notifications.filter(
			notification => notification.recipientId === recipientId,
		);
		return recipientNotifications.length;
	}

	async create(notification: Notification) {
		this.notifications.push(notification);
	}

	async save(notification: Notification) {
		const notificationIndex = this.notifications.findIndex(item => item.id === notification.id);
		if (notificationIndex < 0) {
			return;
		}
		this.notifications[notificationIndex] = notification;
	}
}
