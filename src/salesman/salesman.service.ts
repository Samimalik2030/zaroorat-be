import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { Role } from 'src/user/user.dto';
import { Salesman, SalesmanDocument } from './salesman.mongo';
import { CreateSalesmanDto, SalesmanQueryDto } from './salesman.dto';
import { SafeSubscriber } from 'rxjs/internal/Subscriber';

@Injectable()
export class SalesmanService {
  constructor(
    @InjectModel(Salesman.name)
    private readonly recruiterModel: Model<SalesmanDocument>,
    private readonly UserService: UserService,
  ) {}

  async create(createRecruiterDto: CreateSalesmanDto): Promise<Salesman> {
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
      role: Role.SALESMAN,
      roleType: 'Salesman Portal',
    });
    const recruiter = new this.recruiterModel({
      ...createRecruiterDto,
      user: newUser,
    });
    return recruiter.save();
  }

  async findAll(query: SalesmanQueryDto): Promise<Salesman[]> {
    const filter: any = {};

    if (query.city) {
      filter.city = query.city;
    }

    if (query.name) {
      const users = await this.UserService.filter({
        fullName: { $regex: query.name, $options: 'i' },
        role: Role.SALESMAN,
      });
      console.log(users, 'users');
      const userIds = users.map((user) => user._id);

      if (userIds.length > 0) {
        filter.user = { $in: userIds };
      } else {
        return [];
      }
    }

    return this.recruiterModel.find(filter).populate('user').exec();
  }

  async findById(id: string): Promise<Salesman> {
    const recruiter = await this.recruiterModel.findById(id).populate('user');
    if (!recruiter) {
      throw new NotFoundException('Recruiter not found');
    }
    return recruiter;
  }

  async update(
    id: string,
    updateDto: Partial<CreateSalesmanDto>,
  ): Promise<Salesman> {
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

  async getSalesmanByUser(id: string) {
    const foundUser = await this.UserService.findById(id);
    console.log(foundUser, 'Found User');
    if (!foundUser) {
      return new NotFoundException('User not found');
    }
    const foundRecruiter = await this.recruiterModel.findOne({
      user: foundUser,
    });
    console.log(foundRecruiter,'found recruiter')
    return foundRecruiter;
  }
}
