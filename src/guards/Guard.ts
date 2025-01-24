import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
@Injectable()
export class JwtGuard implements CanActivate {
  constructor() {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['headers']
    const [type,token] = authHeader.trim().split(' ')
    return;
  }
}
