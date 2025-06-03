import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateDistrictOfficerDto,
  DistrictOfficerQueryDto,
  UpdateDistrictOfficerDto,
} from './city-officers.dto';
import { UserService } from 'src/user/user.service';
import { Role } from 'src/user/user.dto';
import { CityOfficer, CityOfficerDocument } from './city-officers.mongo';

@Injectable()
export class CityOfficerService {
  constructor(
    @InjectModel(CityOfficer.name)
    private readonly officerModel: Model<CityOfficerDocument>,
    private readonly userService: UserService,
  ) {}

  async create(createDto: CreateDistrictOfficerDto): Promise<CityOfficer> {
    const exists = await this.officerModel.findOne({
      city: createDto.city,
    });
    if (exists) {
      throw new UnprocessableEntityException(
        'There is already a  manager in this city',
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
      role: Role.CITY_MANAGER,
      roleType: 'City Manager',
    });
    const created = await this.officerModel.create({
      ...createDto,
      user: newUser,
    });
    return created;
  }

  async findAll(query: DistrictOfficerQueryDto): Promise<CityOfficer[]> {
    const filter: any = {};

    if (query.name) filter.name = new RegExp(query.name, 'i');
    if (query.city) filter.city = new RegExp(query.city, 'i');

    return this.officerModel.find(filter).populate('user').exec();
  }

  async findById(id: string): Promise<CityOfficer> {
    const officer = await this.officerModel.findById(id).populate('user');
    if (!officer) throw new NotFoundException('District Officer not found');
    return officer;
  }

  async update(
    id: string,
    updateDto: UpdateDistrictOfficerDto,
  ): Promise<CityOfficer> {
    const updated = await this.officerModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .populate('user');

    if (!updated) throw new NotFoundException('District Officer not found');
    return updated;
  }

  async remove(id: string): Promise<CityOfficer> {
    const manager = await this.officerModel.findById(id);
    if (!manager) {
      throw new NotFoundException('City Manager not found');
    }

    const result = await this.officerModel.findByIdAndDelete(id);
    if(result){
      await this.userService.delete(manager?.user)
    }
    return result
  }

  async getOfficerByUser(id: string) {
    console.log(id, 'id');
    const foundUser = await this.userService.findById(id);
    if (!foundUser) {
      return new NotFoundException('User not found');
    }

    const foundRecruiter = await this.officerModel.findOne({
      user: foundUser,
    }).populate('user');
    return foundRecruiter;
  }
}
