import { Module } from '@nestjs/common';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Application, ApplicationSchema } from './application.mongo';
import { JobModule } from 'src/job/job.module';
import { CandidateModule } from 'src/candidate/candidate.module';
import { MailerModule } from 'src/mailer/mailer.module';
import { User } from 'src/user/user.mongo';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Application.name, schema: ApplicationSchema },
    ]),
    JobModule,
    CandidateModule,
    MailerModule,
    UserModule
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService,JwtService],
})
export class ApplicationModule {}
