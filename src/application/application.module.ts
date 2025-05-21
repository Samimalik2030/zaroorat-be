import { Module } from '@nestjs/common';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Application, ApplicationSchema } from './application.mongo';
import { JobModule } from 'src/job/job.module';
import { CandidateModule } from 'src/candidate/candidate.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Application.name, schema: ApplicationSchema },
    ]),
    JobModule,
    CandidateModule,
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
