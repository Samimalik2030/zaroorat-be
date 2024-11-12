// src/interfaces/request.interface.ts
import { Request } from 'express';
import {  UserDto } from 'src/user/user.dto';

export interface AuthenticatedRequest extends Request {
  user: UserDto;
}
