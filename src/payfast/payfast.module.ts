import { Module } from '@nestjs/common';
import { PayfastService } from './payfast.service';
import { PayfastController } from './payfast.controller';

@Module({
  providers: [PayfastService],
  controllers: [PayfastController]
})
export class PayfastModule {}
