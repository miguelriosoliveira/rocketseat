import { IsNotEmpty, IsUUID, Length } from 'class-validator';

export class CreateNotificationBody {
	@Length(5, 240)
	content: string;

	@IsNotEmpty()
	category: string;

	@IsUUID()
	recipientId: string;
}
