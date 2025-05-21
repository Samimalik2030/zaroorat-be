import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Job, JobSchema } from './job.mongo';
import { JobsService } from './job.service';
import { JobsController } from './job.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }])],
  controllers: [JobsController],
  providers: [JobsService,JwtService],
  exports: [JobsService],
})
export class JobModule {}
