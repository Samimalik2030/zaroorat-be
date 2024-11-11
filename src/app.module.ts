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
import { PostsModule } from './posts/posts.module';




@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    TokenModule,
    ImageKitModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: SchemaToClassInterceptor },
  ],
})
export class AppModule {}
