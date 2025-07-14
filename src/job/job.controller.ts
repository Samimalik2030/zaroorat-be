import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { JobsService } from './job.service';

import { Job } from './schema/job.mongo';
import { JwtAdminGuard } from 'src/guards/jwtAdminGuard';
import { CreateJobPostDto, JobQueryDto, UpdateJobPostDto } from './job.dto';

@ApiTags('jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new job posting' })
  @ApiResponse({
    status: 201,
    description: 'Job successfully created.',
    type: Job,
  })
  @ApiBody({ type: CreateJobPostDto })
  @UseGuards(JwtAdminGuard)
  create(@Body() createJobDto: CreateJobPostDto) {
    return this.jobsService.create(createJobDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all jobs or filter by title' })
  @ApiResponse({ status: 200, description: 'List of jobs', type: [Job] })
  @ApiQuery({ type: JobQueryDto })
  findAll(@Query() query: JobQueryDto) {
    console.log(query, 'query');
    return this.jobsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get job by ID' })
  @ApiResponse({ status: 200, description: 'Job found', type: Job })
  @ApiResponse({ status: 404, description: 'Job not found' })
  @ApiParam({ name: 'id', description: 'Job ID' })
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update job by ID' })
  @ApiResponse({ status: 200, description: 'Job updated', type: Job })
  @ApiResponse({ status: 404, description: 'Job not found' })
  @ApiParam({ name: 'id', description: 'Job ID' })
  @ApiBody({ type: UpdateJobPostDto })
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobPostDto) {
    return this.jobsService.update(id, updateJobDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete job by ID' })
  @ApiResponse({ status: 204, description: 'Job deleted successfully' })
  @ApiResponse({ status: 404, description: 'Job not found' })
  @ApiParam({ name: 'id', description: 'Job ID' })
  remove(@Param('id') id: string) {
    return this.jobsService.remove(id);
  }
}
