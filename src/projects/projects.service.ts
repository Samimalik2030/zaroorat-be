import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './projects.mongo';
import { Model } from 'mongoose';
import { createProjectDto, UpdateProjectDto } from './project.dto';

@Injectable()
export class ProjectsService {
    
    constructor(
        @InjectModel(Project.name) private projectModel: Model<Project>
    ) {}   
    


    async getProjects():Promise<Project[]> {
        return await this.projectModel.find();
    }

    async first(data:Partial<Project>):Promise<Project> {
        return await this.projectModel.findOne(data);
    }

    async createProject(data:createProjectDto):Promise<Project> {
        return await this.projectModel.create(data);
    }

    async getProject(id: string):Promise<Project> {
        return await this.projectModel.findById(id);
    }

    async updateProject(id: string, updateProjectDto: UpdateProjectDto):Promise<Project> {
        return await this.projectModel.findByIdAndUpdate(id, updateProjectDto);
    }

    async deleteProject(id: string):Promise<Project> {
        return await this.projectModel.findByIdAndDelete(id);
    }
}
