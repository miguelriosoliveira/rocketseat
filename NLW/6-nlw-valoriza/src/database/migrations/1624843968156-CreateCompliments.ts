import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCompliments1624843968156 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'compliments',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()',
					},
					{
						name: 'user_sender_id',
						type: 'uuid',
					},
					{
						name: 'user_receiver_id',
						type: 'uuid',
					},
					{
						name: 'tag_id',
						type: 'uuid',
					},
					{
						name: 'message',
						type: 'varchar',
					},
					{
						name: 'created_at',
						type: 'timestamp',
						default: 'now()',
					},
				],
				foreignKeys: [
					{
						name: 'fk-user_sender-compliments',
						columnNames: ['user_sender_id'],
						referencedTableName: 'users',
						referencedColumnNames: ['id'],
						onDelete: 'SET NULL',
						onUpdate: 'SET NULL',
					},
					{
						name: 'fk-user_receiver-compliments',
						columnNames: ['user_receiver_id'],
						referencedTableName: 'users',
						referencedColumnNames: ['id'],
						onDelete: 'SET NULL',
						onUpdate: 'SET NULL',
					},
					{
						name: 'fk-tag-compliments',
						columnNames: ['tag_id'],
						referencedTableName: 'tags',
						referencedColumnNames: ['id'],
						onDelete: 'SET NULL',
						onUpdate: 'SET NULL',
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('compliments');
	}
}
