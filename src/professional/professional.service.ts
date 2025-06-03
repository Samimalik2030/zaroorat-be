import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Professional, ProfessionalDocument } from './professional.mongo';
import {
  CreateProfessionalDto,
  ProfessionalQueryDto,
} from './professional.dto';

@Injectable()
export class ProfessionalService {
  constructor(
    @InjectModel(Professional.name)
    private professionalModel: Model<ProfessionalDocument>,
  ) {}

  async create(createDto: CreateProfessionalDto): Promise<Professional> {
    return await this.professionalModel.create({
      ...createDto,
      coordinates: {
        latitude: createDto.latitude,
        longitude: createDto.longitude,
      },
    });
  }

  async findAll(query: ProfessionalQueryDto): Promise<Professional[]> {
    const filter: any = {};

    if (query.city) {
      filter.city = query.city;
    }

    if (query.profession) {
      filter.profession = query.profession;
    }

    if (query.address) {
      filter.address = { $regex: query.address, $options: 'i' }; // optional: case-insensitive partial match
    }

    return this.professionalModel.find(filter).exec();
  }

  async findOne(id: string): Promise<Professional> {
    const professional = await this.professionalModel.findById(id).exec();
    if (!professional) {
      throw new NotFoundException(`Professional with id ${id} not found`);
    }
    return professional;
  }

  async update(
    id: string,
    updateDto: CreateProfessionalDto,
  ): Promise<Professional> {
    const updatedProfessional = await this.professionalModel
      .findByIdAndUpdate(id, updateDto, { returnDocument: 'after' })
      .exec();
    if (!updatedProfessional) {
      throw new NotFoundException(`Professional with id ${id} not found`);
    }
    return updatedProfessional;
  }

  async remove(id: string): Promise<void> {
    const result = await this.professionalModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Professional with id ${id} not found`);
    }
  }
}
