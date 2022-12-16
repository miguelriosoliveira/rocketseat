import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFoundError } from './errors/notification-not-found-error';
import { UnreadNotification } from './unread-notification';

describe('Unread notification use case', () => {
	it('should be able to read a notification', async () => {
		// Arrange
		const notificationsRepository = new InMemoryNotificationsRepository();
		const notification = makeNotification({ readAt: new Date() });
		await notificationsRepository.create(notification);

		// Act
		const unreadNotification = new UnreadNotification(notificationsRepository);
		await unreadNotification.execute(notification.id);

		// Assert
		expect(notificationsRepository.notifications).toHaveLength(1);
		expect(notificationsRepository.notifications[0].readAt).toBeNull();
	});

	it('should not be able to read a non-existent notification', async () => {
		// Arrange
		const notificationsRepository = new InMemoryNotificationsRepository();

		// Act
		const unreadNotification = new UnreadNotification(notificationsRepository);

		// Assert
		expect(() => unreadNotification.execute('non-existent-notification-id')).rejects.toThrow(
			NotificationNotFoundError,
		);
	});
});
