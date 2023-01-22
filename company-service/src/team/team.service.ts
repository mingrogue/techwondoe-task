import { BadGatewayException, Injectable } from "@nestjs/common";
import { HttpErrorByCode } from "@nestjs/common/utils/http-error-by-code.util";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Company, CompanyDocument } from "src/company/company.schema";
import { BadRequestError } from "src/errors/bad-request-error";
import { Team, TeamDocument } from "./team.schema";

@Injectable()
export class TeamService {

    constructor(@InjectModel(Team.name) private teamModel: Model<TeamDocument>, @InjectModel(Company.name) private companyModel: Model<CompanyDocument>) {}
    
    async createTeam(team: Team): Promise<Team> {
        if(!await this.companyModel.findOne({id: team.companyId})) throw new BadRequestError('no company present with this id')
        const newTeam = new this.teamModel(team);
        return newTeam.save();
    }

    async readAll(): Promise<Team[]> {
        return await this.companyModel.aggregate([
            {
                $lookup: {
                    from: 'teams',
                    foreignField: 'companyId',
                    localField: 'id',
                    as: 'teams'
                }
            }
        ])
    }
}