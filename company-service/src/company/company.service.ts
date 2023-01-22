import { BadGatewayException, Injectable } from "@nestjs/common";
import { HttpErrorByCode } from "@nestjs/common/utils/http-error-by-code.util";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BadRequestError } from "src/errors/bad-request-error";
import { Company, CompanyDocument } from "./company.schema";

@Injectable()
export class CompanyService {

    constructor(@InjectModel(Company.name) private companyModel: Model<CompanyDocument>) {}
    
    async create(company: Company): Promise<Company> {
        const companyFound = await this.companyModel.findOne({name:company.name})
        
        if(companyFound) throw new BadRequestError('Enter different Company')
        const newCompany = new this.companyModel(company);
        
        return newCompany.save();
    }

    async readAll(): Promise<Company[]> {
        return await this.companyModel.find().exec();
    }

    async readById(id): Promise<Company> {
        return await this.companyModel.findOne({id}).exec();
    }

    async getByName(name): Promise<Company> {        
        return await this.companyModel.findOne({name}).exec();
    }

    // async update(id, company: Company): Promise<Company> {
    //     return await this.companyModel.findByIdAndUpdate(id, company, {new: true})
    // }

    // async delete(id): Promise<any> {
    //     return await this.companyModel.findByIdAndRemove(id);
    // }
}