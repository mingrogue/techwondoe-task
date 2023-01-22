import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyController } from './company/company.comtroller';
import { CompanyService } from './company/company.service';
import { Company, CompanySchema } from './company/company.schema';
import { TeamController } from './team/team.comtroller';
import { TeamService } from './team/team.service';
import { Team, TeamSchema } from './team/team.schema';
import { AuthMiddleware } from './middlewares/auth.middleware';

@Module({
  imports: [MongooseModule.forRoot('mongodb://mongo:27017/nest-mongoose'),
  MongooseModule.forFeature([{name: Company.name, schema: CompanySchema}, {name: Team.name, schema: TeamSchema}])],
  controllers: [AppController, CompanyController,TeamController],
  providers: [AppService, CompanyService,TeamService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}