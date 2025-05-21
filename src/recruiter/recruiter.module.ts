import { Module } from '@nestjs/common';
import { RecruiterService } from './recruiter.service';
import { RecruiterController } from './recruiter.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Recruiter, RecruiterSchema } from './recruiter.mongo';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Recruiter.name,
        schema: RecruiterSchema,
      },
    ]),
    UserModule
  ],
  providers: [RecruiterService],
  controllers: [RecruiterController],
  exports: [RecruiterService],
})
export class RecruiterModule {}
