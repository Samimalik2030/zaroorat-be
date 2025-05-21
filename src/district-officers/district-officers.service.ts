import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  DistrictOfficer,
  DistrictOfficerDocument,
} from './district-officers.mongo';
import {
  CreateDistrictOfficerDto,
  DistrictOfficerQueryDto,
  UpdateDistrictOfficerDto,
} from './district-officers.dto';
import { UserService } from 'src/user/user.service';
import { Role } from 'src/user/user.dto';

@Injectable()
export class DistrictOfficerService {
  constructor(
    @InjectModel(DistrictOfficer.name)
    private readonly officerModel: Model<DistrictOfficerDocument>,
    private readonly userService: UserService,
  ) {}

  async create(createDto: CreateDistrictOfficerDto): Promise<DistrictOfficer> {
    const exists = await this.officerModel.findOne({
      district: createDto.district,
    });
    if (exists) {
      throw new UnprocessableEntityException(
        'There is already a  officer in this district',
      );
    }
    const foundUser = await this.userService.first({
      email: createDto.email,
    });
    if (foundUser) {
      throw new UnprocessableEntityException(
        'There is already a user registered with this email',
      );
    }
    const newUser = await this.userService.createUser({
      email: createDto.email,
      name: createDto.name,
      role: Role.DISTRICT_OFFICER,
      roleType: 'District Officer',
    });
    const created = await this.officerModel.create({
      ...createDto,
      user: newUser,
    });
    return created;
  }

  async findAll(query: DistrictOfficerQueryDto): Promise<DistrictOfficer[]> {
    const filter: any = {};
    if (query.cnic) filter.cnic = query.cnic;
    if (query.district) filter.district = new RegExp(query.district, 'i');
    if (query.name) filter.name = new RegExp(query.name, 'i');

    return this.officerModel.find(filter).populate('user').exec();
  }

  async findById(id: string): Promise<DistrictOfficer> {
    const officer = await this.officerModel.findById(id).populate('user');
    if (!officer) throw new NotFoundException('District Officer not found');
    return officer;
  }

  async update(
    id: string,
    updateDto: UpdateDistrictOfficerDto,
  ): Promise<DistrictOfficer> {
    const updated = await this.officerModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .populate('user');

    if (!updated) throw new NotFoundException('District Officer not found');
    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.officerModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('District Officer not found');
  }

  async getOfficerByUser(id: string) {
    console.log(id, 'id');
    const foundUser = await this.userService.findById(id);
    if (!foundUser) {
      return new NotFoundException('User not found');
    }
    console.log(foundUser, 'found user');
    const foundRecruiter = await this.officerModel.findOne({
      user: foundUser,
    });
    return foundRecruiter;
  }
}
