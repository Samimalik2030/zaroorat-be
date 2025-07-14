import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';

import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from './user.mongo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TokenModule } from 'src/token/token.module';
import { MailerModule } from 'src/mailer/mailer.module';
import { ImageKitModule } from 'src/image-kit/image-kit.module';
import { AppModule } from 'src/app.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '1d',
          audience: 'www.tn-nest.com',
          issuer: 'www.tn-nest.com',
        },
      }),
    }),
    TokenModule,
    MailerModule,
    ImageKitModule,
    forwardRef(() => AppModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
