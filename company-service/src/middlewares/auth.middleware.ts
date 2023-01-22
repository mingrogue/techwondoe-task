import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import {verify} from 'jsonwebtoken';
import AuthRequest from 'src/interfaces/authRequest';



export class AuthMiddleware implements NestMiddleware {
  use(req: AuthRequest, res: Response, next: NextFunction) {
    // console.log('before check',req.headers.authorization);
    try{
      const payload = verify(
        req.headers.authorization.split(' ')[1],
        'jwt-secret'
      );
      // console.log(payload);
      req.auth = true
      req.jwtPayload = payload as object
      next();
    }catch(err){
      req.auth = false
      next()
    }
  }
}

