import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { KafkaConfig } from './configs';
import { config } from './shared/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>(KafkaConfig);

  await app.listen(config.getPort());
}
bootstrap();
