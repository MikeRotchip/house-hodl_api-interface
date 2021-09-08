import { Module } from '@nestjs/common';
import { ExpenseController, HouseController } from './controllers';
import { AuthenticationModule } from '../authentication/authentication.module';

@Module({
  imports: [AuthenticationModule],
  controllers: [ExpenseController, HouseController],
})
export class HouseModule {}
