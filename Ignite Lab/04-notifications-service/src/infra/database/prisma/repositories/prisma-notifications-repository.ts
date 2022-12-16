import { Injectable } from '@nestjs/common';
import { Notification } from '@app/entities/notification';
import { NotificationsRepository } from '@app/repositories/notifications-repository';
import { PrismaService } from '../prisma.service';
import { PrismaNotificationsMapper } from '../mappers/prisma-notification-mapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
	constructor(private prisma: PrismaService) {}

	async findById(notificationId: string) {
		const notification = await this.prisma.notification.findUnique({
			where: { id: notificationId },
		});
		if (!notification) {
			return null;
		}
		return PrismaNotificationsMapper.toDomain(notification);
	}

	async findManyByRecipientId(recipientId: string) {
		const notifications = await this.prisma.notification.findMany({ where: { recipientId } });
		return notifications.map(PrismaNotificationsMapper.toDomain);
	}

	async countManyByRecipientId(recipientId: string) {
		const count = await this.prisma.notification.count({ where: { recipientId } });
		return count;
	}

	async create(notification: Notification) {
		await this.prisma.notification.create({
			data: PrismaNotificationsMapper.toPrisma(notification),
		});
	}

	async save(notification: Notification) {
		await this.prisma.notification.update({
			where: { id: notification.id },
			data: PrismaNotificationsMapper.toPrisma(notification),
		});
	}
}
