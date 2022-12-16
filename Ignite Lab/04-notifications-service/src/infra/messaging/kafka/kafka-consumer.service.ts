import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService extends ServerKafka implements OnModuleDestroy {
	constructor() {
		const { KAFKA_ENDPOINT, KAFKA_USERNAME, KAFKA_PASSWORD } = process.env;
		super({
			client: {
				clientId: 'notifications',
				brokers: [String(KAFKA_ENDPOINT)],
				sasl: {
					mechanism: 'scram-sha-512',
					username: String(KAFKA_USERNAME),
					password: String(KAFKA_PASSWORD),
				},
				ssl: true,
			},
		});
	}

	async onModuleDestroy() {
		await this.close();
	}
}
