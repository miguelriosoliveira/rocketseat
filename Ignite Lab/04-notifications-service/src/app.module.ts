import { MessagingModule } from '@infra/messaging/messaging.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from './infra/database/database.module';
import { HttpModule } from './infra/http/http.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			validationSchema: Joi.object({
				PORT: Joi.number(),
				DATABASE_URL: Joi.string(),
				KAFKA_ENDPOINT: Joi.string(),
				KAFKA_USERNAME: Joi.string(),
				KAFKA_PASSWORD: Joi.string(),
				KAFKA_TOPIC: Joi.string(),
			}).options({ presence: 'required' }),
		}),
		HttpModule,
		DatabaseModule,
		MessagingModule,
	],
})
export class AppModule {}
