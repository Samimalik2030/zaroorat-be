import { Module } from '@nestjs/common';
import { BookingService } from './bookings.service';
import { BookingController } from './bookings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from './bookings.mongo';
import { ImageKitModule } from 'src/image-kit/image-kit.module';
import { UserModule } from 'src/user/user.module';
import { ProfessionalService } from 'src/professional/professional.service';
import { ProfessionalModule } from 'src/professional/professional.module';
import { WhatsappModule } from 'src/whatsapp/whatsapp.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Booking.name,
        schema: BookingSchema,
      },
    ]),
    ImageKitModule,
    UserModule,
    ProfessionalModule,
    WhatsappModule
  ],
  providers: [BookingService],
  controllers: [BookingController],
  exports: [BookingService],
})
export class BookingsModule {}
