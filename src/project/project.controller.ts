import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto, UpdateProjectDto } from './project.dto';
import { Project } from './project.mongo';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  // GET all projects
  @Get()
  async findAll(): Promise<Project[]> {
    return await this.projectService.findAll();
  }

  // GET one project by query parameters (e.g., by title, location)
  @Get('search')
  async findOne(@Body() searchData: Partial<Project>): Promise<Project> {
    return await this.projectService.findOne(searchData);
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

  // DELETE a project by ID
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Project> {
    return await this.projectService.delete(id);
  }
}
