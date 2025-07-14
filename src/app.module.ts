import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SchemaToClassInterceptor } from './interceptors/SchemaToClassInterceptor';
import { TokenModule } from './token/token.module';
import { ImageKitModule } from './image-kit/image-kit.module';
import { JwtModule } from '@nestjs/jwt';
import { SeedService } from './seeder/seeder.service';
import { InquiryModule } from './inquiry/inquiry.module';
import { MailerModule } from './mailer/mailer.module';
import { ImageModule } from './image/image.module';
import { CityOfficersModule } from './city-officers/city-officers.module';
import { SalesmanModule } from './salesman/salesman.module';
import { ProfessionalModule } from './professional/professional.module';
import { BookingsModule } from './bookings/bookings.module';
import { WhatsappModule } from './whatsapp/whatsapp.module';
import { JobModule } from './job/job.module';
import {
  Professional,
  ProfessionalSchema,
} from './professional/professional.mongo';
import { Booking, BookingSchema } from './bookings/bookings.mongo';
import { User, UserSchema } from './user/user.mongo';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: Professional.name, schema: ProfessionalSchema },

      { name: Booking.name, schema: BookingSchema },
      // { name: JobApplication.name, schema: JobApplicationSchema },
      { name: User.name, schema: UserSchema },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    forwardRef(() => UserModule),
    TokenModule,
    ImageKitModule,
    InquiryModule,
    MailerModule,
    ImageModule,
    CityOfficersModule,
    SalesmanModule,
    ProfessionalModule,
    BookingsModule,
    WhatsappModule,
    JobModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: SchemaToClassInterceptor },
    SeedService,
  ],
  exports: [AppService],
})
export class AppModule {}
