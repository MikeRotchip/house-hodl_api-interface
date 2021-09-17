import { rolesUtil, AuthService } from '../services';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRole } from '../enums';

type AuthMetadata = {
  authorization: string;
};

@Injectable()
export class KafkaMetadataUtil {
  constructor(private jwtService: JwtService) {}

  getUserAuthMetadata(security: AuthService): AuthMetadata {
    return { authorization: security.getToken() };
  }

  getServiceAuthMetadata(): AuthMetadata {
    return {
      authorization:
        'Bearer ' +
        this.jwtService.sign(
          { roles: rolesUtil([AuthRole.SERVICE]) },
          { expiresIn: '2m' },
        ),
    };
  }
}
