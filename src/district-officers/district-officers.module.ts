import { Module } from '@nestjs/common';
import { DistrictOfficerController } from './district-officers.controller';
import { DistrictOfficerService } from './district-officers.service';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DistrictOfficer,
  DistrictOfficerSchema,
} from './district-officers.mongo';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DistrictOfficer.name, schema: DistrictOfficerSchema },
    ]),
    UserModule,
  ],
  controllers: [DistrictOfficerController],
  providers: [DistrictOfficerService],
  exports: [DistrictOfficerService],
})
export class DistrictOfficersModule {}
