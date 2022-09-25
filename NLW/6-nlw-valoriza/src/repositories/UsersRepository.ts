import { EntityRepository, Repository } from 'typeorm';

import { User } from '../entities/User';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
	async findById(id: string) {
		return this.findOne(id);
	}

	async findByEmail(email: string) {
		return this.findOne({ email });
	}

	async findAll() {
		return this.find();
	}
}
