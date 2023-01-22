import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyController } from './company.comtroller';
import { CompanyService } from './company.service';
import { Company, CompanySchema } from './company.schema';

@Module({
  imports: [  
            MongooseModule.forFeature([{name: Company.name, schema: CompanySchema}])],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class AppModule {}
