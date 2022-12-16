import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get recipient notifications use case', () => {
	it('should be able to get notifications of a recipient', async () => {
		// Arrange
		const notificationsRepository = new InMemoryNotificationsRepository();
		await notificationsRepository.create(makeNotification({ recipientId: 'recipient-id-1' }));
		await notificationsRepository.create(makeNotification({ recipientId: 'recipient-id-1' }));
		await notificationsRepository.create(makeNotification({ recipientId: 'recipient-id-2' }));

		// Act
		const getRecipientNotifications = new GetRecipientNotifications(notificationsRepository);
		const { notifications } = await getRecipientNotifications.execute('recipient-id-1');

		// Assert
		expect(notifications).toStrictEqual(
			expect.arrayContaining([
				expect.objectContaining({ recipientId: 'recipient-id-1' }),
				expect.objectContaining({ recipientId: 'recipient-id-1' }),
			]),
		);
	});
});
