import { Module } from '@nestjs/common';
import { ExpenseController, HouseController } from './controllers';
import { AuthenticationModule } from '../authentication/authentication.module';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [AuthenticationModule],
  providers: [],
  controllers: [ExpenseController, HouseController],
})
export class HouseModule {}
