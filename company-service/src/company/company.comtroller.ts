import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Req, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateCompany } from "./dto/company.dto";
import { Company } from "./company.schema";
import { CompanyService } from "./company.service";
import { BadRequestError } from "src/errors/bad-request-error";
import AuthRequest from "src/interfaces/authRequest";
import { NotAuthenticatedError } from "src/errors/unauthenticated";

@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService){}

    @Post()
    @UsePipes(ValidationPipe)
    async createCompany(@Res() response, @Body() company: CreateCompany, @Param() params, @Req() req: AuthRequest) {
        if(!req.auth) return response.status(HttpStatus.UNAUTHORIZED).json()
        console.log(req.jwtPayload, 'further check the scopes are valid or not')
        try{            
            const newCompany = await this.companyService.create(company);
            
            return response.status(HttpStatus.CREATED).json({
                newCompany
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
        const companies = await this.companyService.readAll();
        return response.status(HttpStatus.OK).json({
            companies
        })
    }

    @Get('/get-by-id/:id')
    async findById(@Res() response, @Param('id') id, @Req() req: AuthRequest) {
        if(!req.auth) return response.status(HttpStatus.UNAUTHORIZED).json()
        console.log(req.jwtPayload, 'further check the scopes are valid or not')
        
        const company = await this.companyService.readById(id)
        if(!company) throw new BadRequestError('no company present with given id')
        return response.status(HttpStatus.OK).json({
            company
        })
    }

    @Get('/by-name')
    async fetchByName(@Res() response, @Query('name') name, @Req() req: AuthRequest) {
        
        if(!req.auth) return response.status(HttpStatus.UNAUTHORIZED).json()
        console.log(req.jwtPayload, 'further check the scopes are valid or not')
        const fetchedCompany = await this.companyService.getByName(name);
        if(!fetchedCompany) throw new BadRequestError('no company present with given name, search not possible because cannot automate test index creation in mongo')
        return response.status(HttpStatus.OK).json({
            fetchedCompany
        })
    }

    // @Delete('/:id')
    // async delete(@Res() response, @Param('id') id) {
    //     const deletedCompany = await this.companyService.delete(id);
    //     return response.status(HttpStatus.OK).json({
    //         deletedCompany
    //     })
    // }
}
