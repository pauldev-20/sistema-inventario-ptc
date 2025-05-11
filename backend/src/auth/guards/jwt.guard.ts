import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { NotAuthorizationError } from '@/common/exceptions/not-authorization.error';
import { verifyAccessToken } from '../utils';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new NotAuthorizationError('Token no provisto');
    }

    const token = authHeader.split(' ')[1];

    try {
      const payload = verifyAccessToken({ token });
      if (!payload) {
        throw new NotAuthorizationError('Token inválido');
      }
      req.user = payload;
      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      throw new NotAuthorizationError('Token inválido');
    }
  }
}
