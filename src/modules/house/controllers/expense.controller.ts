import { Client, ClientGrpc, ClientKafka } from '@nestjs/microservices';
import { KafkaConfig } from '../../../configs';
import { GrpcMetadataUtil, KafkaMetadataUtil } from '../../authentication/util';
import {
  Body,
  Controller,
  Get,
  OnModuleInit,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Security } from '../../authentication/decorators';
import { SecurityService } from '../../authentication/services';
import { ExpenseCreateDto, ExpenseEditDto, MyExpensesDto } from '../dto';
import { KafkaTopic } from '../enums';
import { JwtAuthGuard } from '../../authentication/guards';
import { IExpenseService } from '../interface';
import { grpcConfig } from '../../../configs';
import { config } from '../../../shared/config.service';

@Controller('expense')
@UseGuards(JwtAuthGuard)
export class ExpenseController implements OnModuleInit {
  constructor(
    private kafkaMetadata: KafkaMetadataUtil,
    private grpcMetadata: GrpcMetadataUtil,
  ) {}

  @Client(KafkaConfig)
  private kafka: ClientKafka;

  @Client(
    grpcConfig(
      ['expense'],
      ['src/modules/house/proto/expense.proto'],
      config.getHouseServiceUrl(),
    ),
  )
  private grpc: ClientGrpc;

  private expenseService: IExpenseService;

  onModuleInit(): void {
    this.expenseService =
      this.grpc.getService<IExpenseService>('ExpenseService');
  }

  @Post('/')
  async createExpense(
    @Security() security: SecurityService,
    @Body() expenseCreateDto: ExpenseCreateDto,
  ) {
    this.kafka.emit(KafkaTopic.EXPENSE_CREATE, {
      headers: this.kafkaMetadata.getUserAuthMetadata(security),
      value: expenseCreateDto,
    });
  }

  @Put('/:expenseId')
  async editExpense(
    @Security() security: SecurityService,
    @Body() expenseEditDto: ExpenseEditDto,
    @Param('expenseId') expenseId: number,
  ) {
    this.kafka.emit(KafkaTopic.EXPENSE_EDIT, {
      headers: this.kafkaMetadata.getUserAuthMetadata(security),
      value: { expenseId, ...expenseEditDto },
    });
  }

  @Get('/my')
  async getMyExpenses(
    @Security() security: SecurityService,
    @Body() myExpensesDto: MyExpensesDto,
  ) {
    return this.expenseService.getMyExpenses(
      myExpensesDto,
      await this.grpcMetadata.getUserAuthMetadata(security),
    );
  }
}
