import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthService } from '../services';

export const HttpAuth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthService => {
    const request = ctx.switchToHttp().getRequest();
    return new AuthService(request.user, request.headers.authorization);
  },
);
