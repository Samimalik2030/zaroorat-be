import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job, JobDocument } from './schema/job.mongo';
import { CreateJobPostDto, JobQueryDto, UpdateJobPostDto } from './job.dto';

@Injectable()
export class JobsService {
  constructor(@InjectModel(Job.name) private jobModel: Model<JobDocument>) {}

  async create(createJobDto: CreateJobPostDto): Promise<Job> {
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
  if (query?.limit) {
    return await this.jobModel.find().limit(query.limit).exec();
  }

  const filter: any = {};

  if (query) {
    if (query.title && typeof query.title === 'string') {
      filter.title = { $regex: query.title, $options: 'i' };
    }
    if (query.category && typeof query.category === 'string') {
      filter.category = { $regex: query.category, $options: 'i' };
    }
    if (query.country && typeof query.country === 'string') {
      filter.country = { $regex: query.country, $options: 'i' };
    }
  }

  console.log(filter, 'filter');
  return this.jobModel.find(filter).exec();
}


  async findOne(id: string): Promise<Job> {
    const job = await this.jobModel.findById(id).exec();
    if (!job) {
      throw new NotFoundException(`Job with id ${id} not found`);
    }
    return job;
  }

  async update(id: string, updateJobDto: UpdateJobPostDto): Promise<Job> {
    console.log(updateJobDto, 'update job data');
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
