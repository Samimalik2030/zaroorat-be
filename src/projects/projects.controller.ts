import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { createProjectDto, UpdateProjectDto } from './project.dto';
import { Project } from './projects.mongo';
import { ApiConsumes, ApiResponse } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImageKitService } from 'src/image-kit/image-kit.service';

@Controller('projects')
export class ProjectsController {
    constructor(
        private projectService: ProjectsService,
        private imageKitService: ImageKitService

    ) {}

    //get all projects

    @Get()  
    @ApiResponse({ status: 200,type: [Project] })
    async getProjects(): Promise<Project[]> {
        return await this.projectService.getProjects();
    }

   //store project

    @Post()
    @ApiResponse({ status: 201,type: Project })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FilesInterceptor('images', 10))
    async createProject(@Body() body: createProjectDto,
     @UploadedFiles() images: Array<Express.Multer.File>,
) {
    const files = await this.imageKitService.uploadImages(images)
        return await this.projectService.createProject(body);
    }

    //get project by id

    @Get(':id') 
    @ApiResponse({ status: 200,type: Project })
    async getProject(@Param('id') id: string) {
        const project = await this.projectService.getProject(id);
        if (!project) {
            return new NotFoundException('Project not found');
        }
        return await this.projectService.getProject(id);
    }


   //update project

    @Patch(':id')
    @ApiResponse({ status: 200,type: Project })
    async updateProject(@Param('id') id: string, updateProjectDto: UpdateProjectDto) {
        const project = await this.projectService.getProject(id);
        if (!project) {
            return new NotFoundException('Project not found');
        }
        return await this.projectService.updateProject(id, updateProjectDto);
    }

    //delete project

    @Delete(':id')
    @ApiResponse({ status: 200,type: Project })
    async deleteProject(@Param('id') id: string) {
        const project = await this.projectService.getProject(id);
        if (!project) {
            return new NotFoundException('Project not found');
        }
        return await this.projectService.deleteProject(id);
    }


}
