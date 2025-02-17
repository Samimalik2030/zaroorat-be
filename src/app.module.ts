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
import { ProjectsModule } from './projects/projects.module';
import { ReviewModule } from './review/review.module';
import { SkillsModule } from './skills/skills.module';
import { MailerModule } from './mailer/mailer.module';

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
    ProjectsModule,
    ReviewModule,
    SkillsModule,
    MailerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: SchemaToClassInterceptor },
    SeedService,
  ],
})
export class AppModule {}
