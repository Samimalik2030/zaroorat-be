import { Module } from '@nestjs/common';
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
import { CandidateModule } from './candidate/candidate.module';
import { JobModule } from './job/job.module';
import { DistrictOfficersModule } from './district-officers/district-officers.module';
import { RecruiterModule } from './recruiter/recruiter.module';
import { ApplicationModule } from './application/application.module';

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
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
    TokenModule,
    ImageKitModule,
    InquiryModule,
    MailerModule,
    ImageModule,
    CandidateModule,
    JobModule,
    DistrictOfficersModule,
    RecruiterModule,
    ApplicationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: SchemaToClassInterceptor },
    SeedService,
  ],
})
export class AppModule {}
