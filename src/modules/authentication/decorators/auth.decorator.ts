import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SecurityService } from '../services';

export const Security = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): SecurityService => {
    const request = ctx.switchToHttp().getRequest();
    return new SecurityService(request.user, request.headers.authorization);
  },
);