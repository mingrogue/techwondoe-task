import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamController } from './team.comtroller';
import { TeamService } from './team.service';
import { Team, TeamSchema } from './team.schema';

@Module({
  imports: [  
            MongooseModule.forFeature([{name: Team.name, schema: TeamSchema}])],
  controllers: [TeamController],
  providers: [TeamService],
})
export class AppModule {}
