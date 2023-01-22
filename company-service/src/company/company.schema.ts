import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

export type CompanyDocument = Company & Document;

@Schema()
export class Company {
    @Prop({required:true, default: uuidv4()})
    id: string;

    @Prop({required:true})
    name: string;

    @Prop({required:true})
    ceo: string;

    @Prop({required:true})
    address: string;
    @Prop({required:true})
    inceptionDate: Date;
}

export const CompanySchema = SchemaFactory.createForClass(Company);