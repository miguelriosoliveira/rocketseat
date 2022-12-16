import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
	it('should be able to create a notification', () => {
		const notification = new Notification({
			category: 'fake-category',
			content: new Content('fake-content'),
			recipientId: 'fake-recipient-id',
		});
		expect(notification).toBeTruthy();
	});
});
