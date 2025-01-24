// src/interfaces/request.interface.ts
import { Request } from 'express';
import { User } from 'src/user/user.mongo';

export interface AuthenticatedRequest extends Request {
  user: User;
}
