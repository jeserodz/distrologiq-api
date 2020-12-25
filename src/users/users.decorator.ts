import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './users.entity';

export const CurrentUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: User | null = request.user;
    return user;
  },
);
