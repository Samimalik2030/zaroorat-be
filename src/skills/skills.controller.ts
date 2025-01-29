import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Skill } from './skills.mongo';
import { CreateSkillDto, UpdateSkillDto } from './skills.dto';

@Controller('skills')
@ApiTags('Skills')
export class SkillsController {
    constructor(
        private readonly skillsService: SkillsService
    ) {}

    @Post()
    @ApiResponse({status:201,type:Skill})
    async store(@Body() data:CreateSkillDto): Promise<Skill> {
        return await this.skillsService.create(data);
    }


    @Get()
    @ApiResponse({status:200,type:[Skill]})
    async index(): Promise<Skill[]> {
        return await this.skillsService.findAll();
    }


    @Get(':id')
    @ApiResponse({status:200,type:Skill})
    async show(id:string): Promise<Skill> {
        return await this.skillsService.findOne(id);
    }

    @Patch(':id')
    @ApiResponse({status:200,type:Skill})
    async update(@Param('id') id:string, @Body() data:UpdateSkillDto): Promise<Skill> {
        return await this.skillsService.update(id, data);
    }

    @Delete(':id')
    @ApiResponse({status:200,type:Skill})
    async destroy(@Param('id') id:string): Promise<Skill> {
        return await this.skillsService.remove(id);
    }

}
