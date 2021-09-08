import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './shared/config.service';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { AccountModule } from './modules/account/account.module';
import { HouseModule } from './modules/house/house.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    AuthenticationModule,
    AccountModule,
    HouseModule,
  ],
})
export class AppModule {}
