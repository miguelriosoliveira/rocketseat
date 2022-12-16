import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFoundError } from './errors/notification-not-found-error';

describe('Cancel notification use case', () => {
	it('should be able to cancel a notification', async () => {
		// Arrange
		const notificationsRepository = new InMemoryNotificationsRepository();
		const notification = makeNotification();
		await notificationsRepository.create(notification);

		// Act
		const cancelNotification = new CancelNotification(notificationsRepository);
		await cancelNotification.execute(notification.id);

		// Assert
		expect(notificationsRepository.notifications).toHaveLength(1);
		expect(notificationsRepository.notifications[0].canceledAt).toStrictEqual(expect.any(Date));
	});

	it('should not be able to cancel a non-existent notification', async () => {
		// Arrange
		const notificationsRepository = new InMemoryNotificationsRepository();

		// Act
		const cancelNotification = new CancelNotification(notificationsRepository);

		// Assert
		expect(() => cancelNotification.execute('non-existent-notification-id')).rejects.toThrow(
			NotificationNotFoundError,
		);
	});
});
