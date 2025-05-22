import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Application, JobDocument } from './application.mongo';
import {
  ApplicationStatus,
  ApplicationUpdateDto,
  CreateApplicationDto,
} from './application.dto';
import { CandidateService } from 'src/candidate/candidate.service';
import { JobsService } from 'src/job/job.service';
import { UserService } from 'src/user/user.service';
import { MailerService } from 'src/mailer/service/mailer.service';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectModel(Application.name)
    private readonly applicationModel: Model<JobDocument>,
    private readonly candidateService: CandidateService,
    private readonly jobService: JobsService,
    private readonly mailerService: MailerService,
    private readonly userService: UserService,
  ) {}

  async create(
    createApplicationDto: CreateApplicationDto,
  ): Promise<Application> {
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
    if (isApplied) {
      throw new UnprocessableEntityException(
        'You have already applied this job',
      );
    }
    const newApplication = new this.applicationModel({
      job: job,
      candidate: candidate,
      status: ApplicationStatus.DATA_VERIFICATION,
    });
    return await newApplication.save();
  }

  async findAll(district?: string): Promise<Application[]> {
    let filter = {};

    if (district) {
      const foundCandidates =
        await this.candidateService.findByDistrict(district);
      console.log(foundCandidates, 'found candidates in multan');
      const candidateIds = foundCandidates.map((can) => can._id);
      filter = { candidate: { $in: candidateIds } };
    }

    return this.applicationModel
      .find(filter)
      .populate({
        path: 'candidate',
        populate: {
          path: 'user',
        },
      })
      .populate('job')
      .exec();
  }

  async findByCandidateId(candidateId: string): Promise<Application[]> {
    const candidate = await this.candidateService.findById(candidateId);
    if (!candidate) {
      throw new NotFoundException('Candidate Not found');
    }
    console.log(candidate, 'candidate');
    const applications = await this.applicationModel
      .find()
      .populate({
        path: 'candidate',
        populate: {
          path: 'user',
        },
      })
      .populate('job')
      .exec();
    return applications;
  }

  async findById(id: string): Promise<Application> {
    const application = await this.applicationModel
      .findById(id)
      .populate({
        path: 'candidate',
        populate: {
          path: 'user',
        },
      })
      .populate('job')
      .exec();

    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }

    return application;
  }

  async update(
    id: string,
    updateDto: ApplicationUpdateDto,
    userId: any,
  ): Promise<JobDocument> {
    const foundUser = await this.userService.findById(userId);
    console.log(foundUser,'found user')
    const updated = await this.applicationModel
      .findByIdAndUpdate(id, updateDto, { returnDocument: 'after' })
      .populate({
        path: 'candidate',
        populate: {
          path: 'user',
        },
      })
      .populate('job')
      .exec();

    if (!updated) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }
    // console.log(updated?.candidate?.user?._id)
    await this.mailerService.sendMail(
  foundUser.email,
  'Update on Your Application Status',
  foundUser.fullName,
  `Dear ${foundUser.fullName},\n\nWe wanted to inform you that your application status has been updated to: **${updateDto.status} Stage**.\n\nThank you for being part of the process.`
);
    return updated;
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const result = await this.applicationModel.findByIdAndDelete(id).exec();
    return { deleted: !!result };
  }
}
