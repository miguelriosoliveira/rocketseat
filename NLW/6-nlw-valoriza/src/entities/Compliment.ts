import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';

import { Tag } from './Tag';
import { User } from './User';

@Entity('compliments')
export class Compliment {
	@PrimaryGeneratedColumn('uuid')
	readonly id: string;

	@Column()
	user_sender_id: string;

	@JoinColumn({ name: 'user_sender_id' })
	@ManyToOne(() => User)
	userSender: User;

	@Column()
	user_receiver_id: string;

	@JoinColumn({ name: 'user_receiver_id' })
	@ManyToOne(() => User)
	userReceiver: User;

	@Column()
	tag_id: string;

	@JoinColumn({ name: 'tag_id' })
	@ManyToOne(() => Tag)
	tag: Tag;

	@Column()
	message: string;

	@CreateDateColumn()
	created_at: Date;
}
