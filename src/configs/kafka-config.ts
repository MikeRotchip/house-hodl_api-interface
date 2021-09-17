import { KafkaOptions, Transport } from '@nestjs/microservices';
import { config } from '../shared/config.service';

export const KafkaConfig: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: { brokers: [config.getKafkaUrl()] },
    consumer: { groupId: 'api-interface', allowAutoTopicCreation: true },
    producer: { allowAutoTopicCreation: true },
  },
};
