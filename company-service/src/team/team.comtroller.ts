import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateTeam } from "./dto/team.dto";
import { Team } from "./team.schema";
import { TeamService } from "./team.service";
import { AuthMiddleware } from "src/middlewares/auth.middleware";
import AuthRequest from "src/interfaces/authRequest";

@Controller('team')
export class TeamController {
    constructor(private readonly teamService: TeamService){}
    
    @Post()
    @UsePipes(ValidationPipe)
    async createTeam(@Res() response, @Body() team: CreateTeam, @Param() params, @Req() req: AuthRequest) {
        if(!req.auth) return response.status(HttpStatus.UNAUTHORIZED).json()
        console.log(req.jwtPayload, 'further check the scopes are valid or not')
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
    async fetchAll(@Res() response, @Req() req: AuthRequest) {
        if(!req.auth) return response.status(HttpStatus.UNAUTHORIZED).json()
        console.log(req.jwtPayload, 'further check the scopes are valid or not')
        const teams = await this.teamService.readAll();
        return response.status(HttpStatus.OK).json({
            teams
        })
    }    
}
