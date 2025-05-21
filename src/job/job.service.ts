import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job, JobDocument } from './job.mongo';
import { CreateJobDto, JobQueryDto, UpdateJobDto } from './job.dto';

@Injectable()
export class JobsService {
  constructor(@InjectModel(Job.name) private jobModel: Model<JobDocument>) {}

  async create(createJobDto: CreateJobDto): Promise<Job> {
    const existingJob = await this.jobModel.findOne({
      title: createJobDto.title,
    });
    if (existingJob) {
      throw new ConflictException(
        `Job with title ${createJobDto.title} already exists`,
      );
    }
    const createdJob = new this.jobModel(createJobDto);
    return createdJob.save();
  }

  async findAll(query?: JobQueryDto): Promise<Job[]> {
    const filter: any = {};
    if (query?.title) {
      filter.title = { $regex: query.title, $options: 'i' };
    }
    return this.jobModel.find(filter).exec();
  }

  async findOne(id: string): Promise<Job> {
    const job = await this.jobModel.findById(id).exec();
    if (!job) {
      throw new NotFoundException(`Job with id ${id} not found`);
    }
    return job;
  }

  async update(id: string, updateJobDto: UpdateJobDto): Promise<Job> {
    const updatedJob = await this.jobModel
      .findByIdAndUpdate(id, updateJobDto, { returnDocument: 'after' })
      .exec();
    if (!updatedJob) {
      throw new NotFoundException(`Job with id ${id} not found`);
    }
    return updatedJob;
  }

  async remove(id: string): Promise<void> {
    const result = await this.jobModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Job with id ${id} not found`);
    }
  }

  async findById(id: string): Promise<Job> {
    return await this.jobModel.findById(id);
  }
}
