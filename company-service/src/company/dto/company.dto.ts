import { IsInt, IsNotEmpty, Length, Min, Max, IsOptional } from "class-validator";

export class CreateCompany {
    @IsNotEmpty({'message':"name should b present"})
    @Length(4,100)
    name: string;

    @IsNotEmpty({'message':"ceo should b present"})
    @Length(1,100)
    ceo: string;

    @IsNotEmpty({'message':"address should b present"})
    @Length(10,100)
    address: string;

    @IsNotEmpty({'message':"inceptionDate should b present"})
    inceptionDate: Date;

    @IsOptional()
    id: string
}