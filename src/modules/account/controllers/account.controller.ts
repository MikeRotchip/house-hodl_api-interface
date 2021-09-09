import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AccountService, IAccount } from '../interfaces';
import { ClientGrpc } from '@nestjs/microservices';
import { AccountDto } from '../dto';
import { JwtAuthGuard } from '../../authentication/guards';
import { GrpcMetadataUtil } from '../../authentication/util';
import { Security } from '../../authentication/decorators';
import { SecurityService } from '../../authentication/services';

@Controller('account')
@UseGuards(JwtAuthGuard)
export class AccountController implements OnModuleInit {
  private accountService: AccountService;

  constructor(
    @Inject('ACCOUNT_PACKAGE')
    private client: ClientGrpc,
    private metadata: GrpcMetadataUtil,
  ) {}

  onModuleInit(): void {
    this.accountService =
      this.client.getService<AccountService>('AccountService');
  }

  @Get('/me')
  async accountByAuthId(
    @Security() security: SecurityService,
  ): Promise<IAccount> {
    return this.accountService.accountByAuth(
      {},
      await this.metadata.getUserAuthMetadata(security),
    );
  }

  @Post('/')
  async createAccount(
    @Security() security: SecurityService,
    @Body() accountDto: AccountDto,
  ): Promise<IAccount> {
    return this.accountService.createAccount(
      accountDto,
      await this.metadata.getUserAuthMetadata(security),
    );
  }

  @Put('/')
  async editAccount(
    @Security() security: SecurityService,
    @Body() accountDto: AccountDto,
  ): Promise<IAccount> {
    return this.accountService.editAccount(
      accountDto,
      await this.metadata.getUserAuthMetadata(security),
    );
  }
}
