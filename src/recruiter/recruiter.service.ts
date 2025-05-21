import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recruiter, RecruiterDocument } from './recruiter.mongo';
import { CreateRecruiterDto, RecruiterQueryDto } from './recruiter.dto';
import { UserService } from 'src/user/user.service';
import { Role } from 'src/user/user.dto';

@Injectable()
export class RecruiterService {
  constructor(
    @InjectModel(Recruiter.name)
    private readonly recruiterModel: Model<RecruiterDocument>,
    private readonly UserService: UserService,
  ) {}

  async create(createRecruiterDto: CreateRecruiterDto): Promise<Recruiter> {
    const user = await this.UserService.first({
      email: createRecruiterDto.email,
    });
    if (user) {
      throw new UnprocessableEntityException(
        'Already account registered with this email',
      );
    }
    const newUser = await this.UserService.createUser({
      email: createRecruiterDto.email,
      name: createRecruiterDto.name,
      role: Role.RECRUITER,
      roleType:"Recruiter Portal"
    });
    const recruiter = new this.recruiterModel({
      ...createRecruiterDto,
      user: newUser,
    });
    return recruiter.save();
  }

  async findAll(query: RecruiterQueryDto): Promise<Recruiter[]> {
    const filter: any = {};

    if (query.district) filter.district = query.district;

    return this.recruiterModel.find(filter).populate('user').exec();
  }

  async findById(id: string): Promise<Recruiter> {
    const recruiter = await this.recruiterModel.findById(id).populate('user');
    if (!recruiter) {
      throw new NotFoundException('Recruiter not found');
    }
    return recruiter;
  }

  async update(
    id: string,
    updateDto: Partial<CreateRecruiterDto>,
  ): Promise<Recruiter> {
    const recruiter = await this.recruiterModel.findByIdAndUpdate(
      id,
      updateDto,
      {
        new: true,
      },
    );
    if (!recruiter) {
      throw new NotFoundException('Recruiter not found');
    }
    return recruiter;
  }

  async delete(id: string): Promise<void> {
    const result = await this.recruiterModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException('Recruiter not found');
    }
  }

  async getRecruiterByUser(id: string) {
    const foundUser = await this.UserService.findById(id);
    if (foundUser) {
      return new NotFoundException('User not found');
    }
    const foundRecruiter = await this.recruiterModel.findOne({
      user: foundUser,
    });
    return foundRecruiter;
  }
}
