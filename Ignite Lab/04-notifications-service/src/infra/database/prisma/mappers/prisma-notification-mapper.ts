import { Notification as RawNotification } from '@prisma/client';
import { Notification } from '@app/entities/notification';
import { Content } from '@app/entities/content';

export class PrismaNotificationsMapper {
	static toPrisma(notification: Notification) {
		return {
			id: notification.id,
			category: notification.category,
			recipientId: notification.recipientId,
			readAt: notification.readAt,
			createdAt: notification.createdAt,
			canceledAt: notification.canceledAt,
			content: notification.content.value,
		};
	}

	static toDomain(raw: RawNotification) {
		return new Notification(
			{
				...raw,
				content: new Content(raw.content),
			},
			raw.id,
		);
	}
}
