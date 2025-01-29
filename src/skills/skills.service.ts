import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Skill } from './skills.mongo';
import { CreateSkillDto, UpdateSkillDto } from './skills.dto';

@Injectable()
export class SkillsService {
    constructor(
        @InjectModel(Skill.name) private readonly skillModel: Model<Skill>
    ) {}

    async create(data:CreateSkillDto): Promise<Skill> {
       return await this.skillModel.create(data);
    }

    async findAll(): Promise<Skill[]> {
        return await this.skillModel.find().exec();
    }


    async findOne(id:string): Promise<Skill> {
        return await this.skillModel.findById(id).exec();
    }


    async update(id:string, data:UpdateSkillDto): Promise<Skill> {
        return await this.skillModel.findByIdAndUpdate(id, data, {new:true}).exec();      
}

async remove(id:string): Promise<Skill> {    
    return await this.skillModel.findByIdAndDelete(id).exec();
}

}
