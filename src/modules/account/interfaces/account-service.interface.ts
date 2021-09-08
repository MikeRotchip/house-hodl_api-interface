import { IAccountDto } from './account-dto.interface';
import { IAccount } from './account.interface';
import { Metadata } from '@grpc/grpc-js';

export interface AccountService {
  createAccount(accountDto: IAccountDto, metadata: Metadata): Promise<IAccount>;
  editAccount(accountDto: IAccountDto, metadata: Metadata): Promise<IAccount>;
  accountByAuth({}: any, metadata: Metadata): Promise<IAccount>;
}
