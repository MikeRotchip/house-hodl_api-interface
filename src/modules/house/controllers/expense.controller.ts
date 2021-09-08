import { Client, ClientKafka } from '@nestjs/microservices';
import { KafkaConfig } from '../../../configs/kafka-config';
import { KafkaMetadataUtil } from '../../authentication/util';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Security } from '../../authentication/decorators';
import { SecurityService } from '../../authentication/services';
import { ExpenseCreateDto } from '../dto';
import { KafkaTopic } from '../enums';
import { JwtAuthGuard } from '../../authentication/guards';

@Controller('expense')
@UseGuards(JwtAuthGuard)
export class ExpenseController {
  @Client(KafkaConfig)
  private client: ClientKafka;

  constructor(private kafkaMetadata: KafkaMetadataUtil) {}

  @Post('/')
  async createExpense(
    @Security() security: SecurityService,
    @Body() expenseCreateDto: ExpenseCreateDto,
  ) {
    this.client.emit(KafkaTopic.EXPENSE_CREATE, {
      headers: this.kafkaMetadata.getUserAuthMetadata(security),
      value: expenseCreateDto,
    });
  }
}
