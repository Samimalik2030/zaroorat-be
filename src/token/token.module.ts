import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, tokenSchema } from './token.mongo';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: tokenSchema }]),
  ],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
