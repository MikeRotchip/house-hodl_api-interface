import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { rolesUtil, SecurityService } from '../services';
import { AuthRole } from '../enums';
import { Metadata } from '@grpc/grpc-js';

@Injectable()
export class GrpcMetadataUtil {
  constructor(private jwtService: JwtService) {}

  async getUserAuthMetadata(security: SecurityService): Promise<Metadata> {
    const metadata = new Metadata();
    metadata.set('authorization', security.getToken());

    return metadata;
  }

  async getServiceAuthMetadata(): Promise<Metadata> {
    const metadata = new Metadata();
    metadata.set(
      'authorization',
      'Bearer ' +
        this.jwtService.sign(
          { roles: rolesUtil([AuthRole.SERVICE]) },
          { expiresIn: '2m' },
        ),
    );

    return metadata;
  }
}
