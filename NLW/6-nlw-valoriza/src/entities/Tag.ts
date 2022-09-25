import { Expose } from 'class-transformer';
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('tags')
export class Tag {
	@PrimaryGeneratedColumn('uuid')
	readonly id: string;

	@Column()
	name: string;

	@Expose({ name: 'display_name' })
	display_name = () => `#${this.name}`;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
