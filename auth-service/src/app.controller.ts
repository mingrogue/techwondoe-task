import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import {sign} from 'jsonwebtoken';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get('token-by-client-credentials')
  async createToken(@Res() response, @Query() query) {
    if(query.grant_type != 'client_credentials') return response.status(401).json('unauthorized')
    const clientId = query.clientId
    const clientSecret = query.clientSecret

    const clientFound = addedClients.filter(client => client.clientId==clientId && client.clientSecret == clientSecret)
    
    const scopesRequested = query.scope.split(',')
    // console.log(query.scope, scopesRequested,clientFound[0].scopes);
    let jwt = null
    if(clientFound.length == 1){
      jwt = sign({email:clientFound.emailId, scopes: scopesRequested.filter(scope => clientFound[0].scopes.includes(scope))}, 'jwt-secret', {expiresIn: 3600})
      return response.status(200).json({token: jwt})
    }else{
      return response.status(401).json('unauthorized')
    }
  }
}

const addedClients = [
  {
    clientId: 'client1',
    clientSecret: 'client1-secret',
    emailId:'client1@gmail.com',
    scopes: ['read', 'write']
  },
  {
    clientId: 'client2',
    clientSecret: 'client2-secret',
    emailId:'client2@gmail.com',
    scopes: ['read', 'write']
  },
  {
    clientId: 'client3',
    clientSecret: 'client3-secret',
    emailId:'client3@gmail.com',
    scopes: ['read', 'write']
  },
  {
    clientId: 'client4',
    clientSecret: 'client4-secret',
    emailId:'client4@gmail.com',
    scopes: ['read', 'write']
  },
  {
    clientId: 'client5',
    clientSecret: 'client5-secret',
    emailId:'client5@gmail.com',
    scopes: ['read', 'write']
  },
  {
    clientId: 'client6',
    clientSecret: 'client6-secret',
    emailId:'client6@gmail.com',
    scopes: ['read', 'write']
  },
  {
    clientId: 'client7',
    clientSecret: 'client7-secret',
    emailId:'client7@gmail.com',
    scopes: ['read', 'write']
  },
] as any