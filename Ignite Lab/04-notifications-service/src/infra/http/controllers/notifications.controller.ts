import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotification } from '@app/useCases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { CancelNotification } from '@app/useCases/cancel-notification';
import { CountRecipientNotifications } from '@app/useCases/count-recipient-notifications';
import { GetRecipientNotifications } from '@app/useCases/get-recipient-notifications';
import { ReadNotification } from '@app/useCases/read-notification';
import { UnreadNotification } from '@app/useCases/unread-notification';

@Controller('notifications')
export class NotificationsController {
	constructor(
		private sendNotification: SendNotification,
		private cancelNotification: CancelNotification,
		private countRecipientNotification: CountRecipientNotifications,
		private getRecipientNotification: GetRecipientNotifications,
		private readNotification: ReadNotification,
		private unreadNotification: UnreadNotification,
	) {}

	@Patch(':id/cancel')
	async cancel(@Param('id') id: string) {
		await this.cancelNotification.execute(id);
	}

	@Get('from/:recipientId/count')
	async countFromRecipient(@Param('recipientId') recipientId: string) {
		const { count } = await this.countRecipientNotification.execute(recipientId);
		return { count };
	}

	@Get('from/:recipientId')
	async getFromRecipient(@Param('recipientId') recipientId: string) {
		const { notifications } = await this.getRecipientNotification.execute(recipientId);
		return { notifications: notifications.map(NotificationViewModel.toHttp) };
	}

	@Patch(':id/read')
	async read(@Param('id') id: string) {
		await this.readNotification.execute(id);
	}

	@Patch(':id/unread')
	async unread(@Param('id') id: string) {
		await this.unreadNotification.execute(id);
	}

	@Post()
	async create(@Body() { content, category, recipientId }: CreateNotificationBody) {
		const { notification } = await this.sendNotification.execute({
			content,
			category,
			recipientId,
		});
		return { notification: NotificationViewModel.toHttp(notification) };
	}
}
