import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './shared/config.service';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { HouseModule } from './modules/house/house.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    AuthenticationModule,
    HouseModule,
  ],
})
export class AppModule {}
