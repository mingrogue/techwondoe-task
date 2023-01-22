import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateTeam } from "./dto/team.dto";
import { Team } from "./team.schema";
import { TeamService } from "./team.service";
import { AuthMiddleware } from "src/middlewares/auth.middleware";

@Controller('team')
export class TeamController {
    constructor(private readonly teamService: TeamService){}
    
    @Post()
    @UsePipes(ValidationPipe)
    async createTeam(@Res() response, @Body() team: CreateTeam, @Param() params) {
        try{            
            const newTeam = await this.teamService.createTeam(team);            
            return response.status(HttpStatus.CREATED).json({
                newTeam
            })
        }catch(err){
            if(err.statusCode) return response.status(400).json(err.message)
            
            return response
        }
    }

    @Get()
    async fetchAll(@Res() response) {
        const teams = await this.teamService.readAll();
        return response.status(HttpStatus.OK).json({
            teams
        })
    }    
}
