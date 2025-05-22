import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
  Query,
  Patch,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ApplicationUpdateDto, CreateApplicationDto,} from './application.dto';
import { Application } from './application.mongo';
import { JwtAuthGuard } from 'src/guards/jwtAuthGuard';
import { Request } from 'express';

@ApiTags('Applications')
@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new application' })
  @ApiResponse({ status: 201, description: 'Application created successfully' })
  create(@Body() createDto: CreateApplicationDto) {
    return this.applicationService.create(createDto);
  }

@Get()
@ApiOperation({ summary: 'Get all applications' })
@ApiResponse({ status: 200,type:[Application], description: 'List of applications returned successfully' })
@ApiQuery({
  name: 'district',
  required: false,
  description: 'Filter applications by district',
  type: String,
})
findAll(@Query('district') district?: string):Promise<Application[]> {
  return this.applicationService.findAll(district);
}

  @Get(':id')
  @ApiOperation({ summary: 'Get application by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Application found' })
  @ApiResponse({ status: 404, description: 'Application not found' })
  findOne(@Param('id') id: string) {
    return this.applicationService.findById(id);
  }


    @Get('/candidate/:candidateId')
  @ApiOperation({ summary: 'Get application by User Id' })
  @ApiParam({ name: 'candidateId', type: String })
  @ApiResponse({ status: 200,type:[Application], description: 'Application found' })
  @ApiResponse({ status: 404, description: 'Application not found' })
  findApplicationsByCandidate(@Param('candidateId') candidateId: string):Promise<Application[]> {
    return this.applicationService.findByCandidateId(candidateId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update application by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Application updated successfully' })
  @ApiResponse({ status: 404, description: 'Application not found' })
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateDto: ApplicationUpdateDto,
    @Req() req:Request
  ) {
    console.log(req.user._id,'user id')
    return this.applicationService.update(id, updateDto,req.user._id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete application by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 204, description: 'Application deleted successfully' })
  @ApiResponse({ status: 404, description: 'Application not found' })
  remove(@Param('id') id: string) {
    return this.applicationService.remove(id);
  }
}
