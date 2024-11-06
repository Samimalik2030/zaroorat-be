import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, tokenSchema } from './token.mongo';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: tokenSchema }]),
  ],
  providers: [TokenService],
  controllers: [TokenController],
})
export class TokenModule {}
