import { Module } from '@nestjs/common';
import { InquiryService } from './inquiry.service';
import { InquiryController } from './inquiry.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Inquiry, InquirySchema } from './inquiry.mongo';

@Module({
  imports:[
    MongooseModule.forFeature([ {name: Inquiry.name, schema: InquirySchema}])
  ],
  providers: [InquiryService],
  controllers: [InquiryController]
})
export class InquiryModule {}
