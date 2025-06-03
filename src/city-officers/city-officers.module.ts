import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CityOfficer, CityOfficerSchema } from './city-officers.mongo';
import { UserModule } from 'src/user/user.module';
import { CityOfficerController } from './city-officers.controller';
import { CityOfficerService } from './city-officers.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CityOfficer.name, schema: CityOfficerSchema },
    ]),
    UserModule,
  ],
  controllers: [CityOfficerController],
  providers: [CityOfficerService],
  exports: [CityOfficerService],
})
export class CityOfficersModule {}
