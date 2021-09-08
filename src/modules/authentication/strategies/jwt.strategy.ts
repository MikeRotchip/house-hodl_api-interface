import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthenticationService } from '../services';
import { Auth } from '../entities';
import { configService } from '../../../shared/config.service';
import { JwtTokenType } from './jwt-token.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private authenticationService: AuthenticationService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getJwtSecret(),
    });
  }

  async validate({ authId }: JwtTokenType): Promise<Auth> {
    return this.authenticationService.findById(authId);
  }
}
