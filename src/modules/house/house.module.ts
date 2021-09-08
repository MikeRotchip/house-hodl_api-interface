import { Module } from '@nestjs/common';
import { HouseController } from './controllers';
import { AuthenticationModule } from '../authentication/authentication.module';

@Module({
  imports: [AuthenticationModule],
  controllers: [HouseController],
})
export class HouseModule {}
