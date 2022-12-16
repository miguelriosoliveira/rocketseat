import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count recipient notifications use case', () => {
	it('should be able to count notifications of a recipient', async () => {
		// Arrange
		const notificationsRepository = new InMemoryNotificationsRepository();
		await notificationsRepository.create(makeNotification({ recipientId: 'recipient-id-1' }));
		await notificationsRepository.create(makeNotification({ recipientId: 'recipient-id-2' }));

		// Act
		const countRecipientNotifications = new CountRecipientNotifications(notificationsRepository);
		const { count } = await countRecipientNotifications.execute('recipient-id-1');

		// Assert
		expect(notificationsRepository.notifications).toHaveLength(2);
		expect(count).toBe(1);
	});
});
