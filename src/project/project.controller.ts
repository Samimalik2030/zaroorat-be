import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto, UpdateProjectDto } from './project.dto';
import { Project } from './project.mongo';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}


  @Get()
      
  
  async findAll(
    @Query('limit') limit?: string
  ): Promise<Project[]> {
    return await this.projectService.findAll(limit);
  }

  // POST a new project
  @Post()
  async create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return await this.projectService.create(createProjectDto);
  }

  // PATCH update a project by ID
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    return await this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Project> {
    return await this.projectService.delete(id);
  }
}
