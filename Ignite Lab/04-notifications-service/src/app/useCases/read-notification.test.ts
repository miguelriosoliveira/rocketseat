import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFoundError } from './errors/notification-not-found-error';
import { ReadNotification } from './read-notification';

describe('Read notification use case', () => {
	it('should be able to read a notification', async () => {
		// Arrange
		const notificationsRepository = new InMemoryNotificationsRepository();
		const notification = makeNotification();
		await notificationsRepository.create(notification);

		// Act
		const readNotification = new ReadNotification(notificationsRepository);
		await readNotification.execute(notification.id);

		// Assert
		expect(notificationsRepository.notifications).toHaveLength(1);
		expect(notificationsRepository.notifications[0].readAt).toStrictEqual(expect.any(Date));
	});

	it('should not be able to read a non-existent notification', async () => {
		// Arrange
		const notificationsRepository = new InMemoryNotificationsRepository();

		// Act
		const readNotification = new ReadNotification(notificationsRepository);

		// Assert
		expect(() => readNotification.execute('non-existent-notification-id')).rejects.toThrow(
			NotificationNotFoundError,
		);
	});
});
