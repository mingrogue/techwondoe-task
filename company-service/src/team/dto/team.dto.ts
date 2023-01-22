import { IsInt, IsNotEmpty, Length, Min, Max, IsOptional } from "class-validator";

export class CreateTeam {

    @IsNotEmpty({'message':"address should b present"})
    @Length(2,100)
    teamLeadName: string;

    @IsNotEmpty({'message':"companyId should b present"})
    @Length(36)
    companyId: string;

    @IsOptional()
    id: string
}