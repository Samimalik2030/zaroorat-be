import { Module } from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { ProfessionalController } from './professional.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Professional, ProfessionalSchema } from './professional.mongo';

@Module({
  imports:[
    MongooseModule.forFeature([{
      name:Professional.name,
      schema:ProfessionalSchema
    }])
  ],
  providers: [ProfessionalService],
  controllers: [ProfessionalController],
  exports:[ProfessionalService]
})
export class ProfessionalModule {}
