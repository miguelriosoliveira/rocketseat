import { KafkaConsumerService } from '@infra/messaging/kafka/kafka-consumer.service';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());
	app.connectMicroservice<MicroserviceOptions>({
		strategy: app.get(KafkaConsumerService),
	});
	await app.startAllMicroservices();
	await app.listen(Number(process.env.PORT));
}

bootstrap();
