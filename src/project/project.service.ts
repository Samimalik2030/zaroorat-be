import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './project.mongo';
import { Model } from 'mongoose';
import { CreateProjectDto, UpdateProjectDto } from './project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private readonly projectModel: Model<Project>,
  ) {}

  async findAll(limit?:string) {
    if(limit){
    const limitInNumber = Number(limit)
    return await this.projectModel.find().limit(limitInNumber);
    }
    return await this.projectModel.find()

  }

  async findOne(data: Partial<Project>) {
    return await this.projectModel.findOne(data);
  }

  async create(data: CreateProjectDto) {
    return await this.projectModel.create(data);
  }

  async update(id: any, data: UpdateProjectDto) {
    return await this.projectModel.findByIdAndUpdate(id, data, {
      returnDocument: 'after',
    });
  }

  async delete(id: any) {
    return await this.projectModel.findByIdAndDelete(id);
  }
}
