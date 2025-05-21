import { Injectable, NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Application, JobDocument } from './application.mongo';
import {
  ApplicationStatus,
  CreateApplicationDto,
  UpdateApplicationDto,
} from './application.dto';
import { CandidateService } from 'src/candidate/candidate.service';
import { JobsService } from 'src/job/job.service';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectModel(Application.name)
    private readonly applicationModel: Model<JobDocument>,
    private readonly candidateService: CandidateService,
    private readonly jobService: JobsService,
  ) {}

  async create(
    createApplicationDto: CreateApplicationDto,
  ): Promise<JobDocument> {
    const candidate = await this.candidateService.findById(
      createApplicationDto.candidate,
    );
    if (!candidate) {
      throw new NotFoundException('Candidate not found');
    }
    const job = await this.jobService.findById(createApplicationDto.job);
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    const isApplied = await this.applicationModel.findOne({
      job: job,
      candidate: candidate,
    });
    if(isApplied){
        throw new UnprocessableEntityException('You have already applied this job')
    }
    const newApplication = new this.applicationModel({
      job: job,
      candidate: candidate,
      status: ApplicationStatus.FIRST,
    });
    return await newApplication.save();
  }

  async findAll(district?: string): Promise<JobDocument[]> {
    let filter = {};

    if (district) {
      const foundCandidates =
        await this.candidateService.findByDistrict(district);
      const candidateIds = foundCandidates.map((can) => can._id);
      filter = { candidate: { $in: candidateIds } };
    }

    return this.applicationModel
      .find(filter)
      .populate('candidate')
      .populate('job')
      .exec();
  }

  async findById(id: string): Promise<JobDocument> {
    const application = await this.applicationModel
      .findById(id)
      .populate('candidate')
      .populate('job')
      .exec();

    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }

    return application;
  }

  async update(
    id: string,
    updateDto: UpdateApplicationDto,
  ): Promise<JobDocument> {
    const updated = await this.applicationModel
      .findByIdAndUpdate(id, updateDto, { returnDocument: 'after' })
      .populate('candidate')
      .populate('job')
      .exec();

    if (!updated) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }

    return updated;
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const result = await this.applicationModel.findByIdAndDelete(id).exec();
    return { deleted: !!result };
  }
}
