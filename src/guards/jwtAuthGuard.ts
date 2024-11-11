import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const token = this.extractTokenFromHeader(request);
    console.log(token, 'request token');
    // if (!token) {
    //   throw new UnauthorizedException('Token not found');
    // }

    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      request['user'] = payload;
      console.log(payload, 'payload');
      return true;
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers['authorization'];
    console.log('Full Authorization Header:', authHeader);
    if (authHeader) {
      const [type, token] = authHeader.trim().split(' ');
      console.log('Token and Type:', type, token);
      if (type === 'Bearer' && token) {
        return token;
      } else {
        console.log('Invalid token format, expected "Bearer <token>"');
      }
    }

    return undefined;
  }
}
