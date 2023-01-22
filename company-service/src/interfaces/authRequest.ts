
import { Request, Response, NextFunction } from 'express';

export default interface AuthRequest extends Request {
  auth: boolean,
  jwtPayload: object
}