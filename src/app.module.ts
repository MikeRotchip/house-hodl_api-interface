import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './shared/config.service';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { HouseModule } from './modules/house/house.module';
import { AccountModule } from './modules/account/account.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config.getTypeOrmConfig()),
    AccountModule,
    AuthenticationModule,
    HouseModule,
  ],
})
export class AppModule {}
