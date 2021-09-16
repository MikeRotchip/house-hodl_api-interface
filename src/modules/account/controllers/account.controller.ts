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
import { HttpAuth } from '../../authentication/decorators';
import { AuthService } from '../../authentication/services';

@Controller('account')
@UseGuards(JwtAuthGuard)
export class AccountController implements OnModuleInit {
  private accountService: AccountService;

  constructor(
    @Inject('ACCOUNT_PACKAGE')
    private grpc: ClientGrpc,
    private grpcMetadata: GrpcMetadataUtil,
  ) {}

  onModuleInit(): void {
    this.accountService =
      this.grpc.getService<AccountService>('AccountService');
  }

  @Get('/me')
  async accountByAuthId(@HttpAuth() auth: AuthService): Promise<IAccount> {
    return this.accountService.accountByAuth(
      {},
      await this.grpcMetadata.getUserAuthMetadata(auth),
    );
  }

  @Post('/')
  async createAccount(
    @HttpAuth() auth: AuthService,
    @Body() accountDto: AccountDto,
  ): Promise<IAccount> {
    return this.accountService.createAccount(
      accountDto,
      await this.grpcMetadata.getUserAuthMetadata(auth),
    );
  }

  @Put('/')
  async editAccount(
    @HttpAuth() auth: AuthService,
    @Body() accountDto: AccountDto,
  ): Promise<IAccount> {
    return this.accountService.editAccount(
      accountDto,
      await this.grpcMetadata.getUserAuthMetadata(auth),
    );
  }
}
