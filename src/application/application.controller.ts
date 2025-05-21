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
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CreateApplicationDto, UpdateApplicationDto } from './application.dto';

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
@ApiResponse({ status: 200, description: 'List of applications returned successfully' })
@ApiQuery({
  name: 'district',
  required: false,
  description: 'Filter applications by district',
  type: String,
})
findAll(@Query('district') district?: string) {
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

  @Put(':id')
  @ApiOperation({ summary: 'Update application by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Application updated successfully' })
  @ApiResponse({ status: 404, description: 'Application not found' })
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateApplicationDto,
  ) {
    return this.applicationService.update(id, updateDto);
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
