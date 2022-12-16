import { SendNotification } from '@app/useCases/send-notification';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

interface NotificationPayload {
	content: string;
	category: string;
	recipientId: string;
}

@Controller()
export class NotificationsController {
	constructor(private sendNotification: SendNotification) {}

	@EventPattern('notifications.send-notification')
	async handleSendNotification(@Payload() { category, content, recipientId }: NotificationPayload) {
		this.sendNotification.execute({ category, content, recipientId });
	}
}
