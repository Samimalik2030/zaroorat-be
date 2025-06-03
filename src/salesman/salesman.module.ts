import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { Salesman, SalesmanSchema } from './salesman.mongo';
import { SalesmanService } from './salesman.service';
import { SalesmanController } from './salesman.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Salesman.name,
        schema: SalesmanSchema,
      },
    ]),
    UserModule
  ],
  providers: [SalesmanService],
  controllers: [SalesmanController],
  exports: [SalesmanService],
})
export class SalesmanModule {}
