import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) throw new UnauthorizedException();

    const jwt = authHeader.replace('Bearer ', '');
    const token = await this.authService.verifyAccessToken(jwt);

    if (token) {
      request.user = token.user;
      return true;
    } else {
      return false;
    }
  }
}
