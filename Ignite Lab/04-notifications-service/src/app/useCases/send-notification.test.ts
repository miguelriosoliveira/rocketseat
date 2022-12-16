import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { SendNotification } from './send-notification';

describe('Send notification use case', () => {
	it('should be able to send a notification', async () => {
		// Arrange
		const notificationsRepository = new InMemoryNotificationsRepository();

		// Act
		const sendNotification = new SendNotification(notificationsRepository);
		const { notification } = await sendNotification.execute({
			category: 'fake-category',
			content: 'fake-content',
			recipientId: 'fake-recipient-id',
		});

		// Assert
		expect(notificationsRepository.notifications).toHaveLength(1);
		expect(notificationsRepository.notifications[0]).toStrictEqual(notification);
	});
});
