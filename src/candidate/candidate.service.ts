import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Candidate } from './schema/candidate.monogo';
import { CreatePersonalInfoDto } from './candidate.dto';
import { User } from 'src/user/user.mongo';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CandidateService {
  constructor(
    @InjectModel(Candidate.name)
    private readonly candidateModel: Model<Candidate>,
    private readonly userService: UserService,
  ) {}

  async create(
    createCandidateDto: CreatePersonalInfoDto,
    userId: any,
  ): Promise<Candidate> {
    const user = await this.userService.findById(userId);
    const foundCandidate = await this.candidateModel.findOne({
      user: user,
    });
    if (foundCandidate) {
      throw new UnprocessableEntityException(
        'There is already linked account with this email',
      );
    }
    const candidate = await this.candidateModel.create({
      ...createCandidateDto,
      user: user,
    });
    return candidate;
  }

  async findByDistrict(district: string): Promise<Candidate[]> {
    return await this.candidateModel.find({
      contact: {
        district: district,
      },
    });
  }

  async findAll(): Promise<Candidate[]> {
    return this.candidateModel.find().exec();
  }

  async findById(id: string): Promise<Candidate> {
    return this.candidateModel.findById(id).exec();
  }

  async findOne(id: string): Promise<Candidate> {
    const candidate = await this.candidateModel.findById(id).exec();
    if (!candidate) {
      throw new NotFoundException(`Candidate with id ${id} not found`);
    }
    return candidate;
  }

  async update(
    id: string,
    updateCandidateDto: Partial<Candidate>,
  ): Promise<Candidate> {
    const updated = await this.candidateModel
      .findByIdAndUpdate(id, updateCandidateDto, {
        returnDocument: 'after',
      })
      .populate('user')
      .exec();

    if (!updated) {
      throw new NotFoundException(`Candidate with id ${id} not found`);
    }

    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.candidateModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Candidate with id ${id} not found`);
    }
  }

  async getOfficerByUser(id: string) {
    console.log(id, 'id');
    const foundUser = await this.userService.findById(id);
    if (!foundUser) {
      return new NotFoundException('User not found');
    }
    console.log(foundUser, 'found user');
    const foundRecruiter = await this.candidateModel
      .findOne({
        user: foundUser,
      })
      .populate('user')
      .exec();
    return foundRecruiter;
  }
}
