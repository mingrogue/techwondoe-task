import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

export type TeamDocument = Team & Document;

@Schema()
export class Team {
    @Prop({required:true, default: uuidv4()})
    id: string;

    @Prop({required:true})
    companyId: string;

    @Prop({required:true})
    teamLeadName: string;
}

export const TeamSchema = SchemaFactory.createForClass(Team);