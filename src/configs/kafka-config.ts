import { KafkaOptions, Transport } from '@nestjs/microservices';
import { configService } from '../shared/config.service';

export const KafkaConfig: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: { brokers: [configService.getKafkaUrl()] },
    consumer: { groupId: 'api-interface' },
  },
};
