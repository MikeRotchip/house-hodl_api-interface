import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities';
import { AuthenticationService } from './services';
import { JwtStrategy } from './strategies';
import { AuthenticationController } from './controllers';
import { JwtModule } from '@nestjs/jwt';
import { config } from '../../shared/config.service';
import { GrpcMetadataUtil, KafkaMetadataUtil } from './util';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Auth]),
    JwtModule.register({ secret: config.getJwtSecret() }),
  ],
  providers: [
    AuthenticationService,
    JwtStrategy,
    GrpcMetadataUtil,
    KafkaMetadataUtil,
  ],
  controllers: [AuthenticationController],
  exports: [GrpcMetadataUtil, KafkaMetadataUtil],
})
export class AuthenticationModule {}
