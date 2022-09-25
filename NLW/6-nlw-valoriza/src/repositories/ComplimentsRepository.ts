import { EntityRepository, Repository } from 'typeorm';

import { Compliment } from '../entities/Compliment';

@EntityRepository(Compliment)
export class ComplimentsRepository extends Repository<Compliment> {
	async findByUserReceiverId(user_receiver_id: string) {
		return this.find({
			where: { user_receiver_id },
			relations: ['userSender', 'userReceiver', 'tag'],
		});
	}

	async findByUserSenderId(user_sender_id: string) {
		return this.find({
			where: { user_sender_id },
			relations: ['userSender', 'userReceiver', 'tag'],
		});
	}
}
