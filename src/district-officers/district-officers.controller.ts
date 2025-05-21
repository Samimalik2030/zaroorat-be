import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { DistrictOfficerService } from './district-officers.service';
import { DistrictOfficer } from './district-officers.mongo';
import {
  CreateDistrictOfficerDto,
  DistrictOfficerQueryDto,
  UpdateDistrictOfficerDto,
} from './district-officers.dto';

@ApiTags('District Officers')
@Controller('district-officers')
export class DistrictOfficerController {
  constructor(
    private readonly districtOfficerService: DistrictOfficerService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new district officer' })
  @ApiResponse({
    status: 201,
    description: 'District officer created',
    type: DistrictOfficer,
  })
  async create(@Body() createDto: CreateDistrictOfficerDto) {
    return this.districtOfficerService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all district officers with optional filters' })
  @ApiResponse({
    status: 200,
    description: 'List of district officers',
    type: [DistrictOfficer],
  })
  async findAll(@Query() query: DistrictOfficerQueryDto) {
    return this.districtOfficerService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a district officer by ID' })
  @ApiParam({ name: 'id', description: 'District officer MongoDB ID' })
  @ApiResponse({
    status: 200,
    description: 'District officer found',
    type: DistrictOfficer,
  })
  async findOne(@Param('id') id: string) {
    return this.districtOfficerService.findById(id);
  }

  @Get('/user/:userId')
  @ApiOperation({ summary: 'Get a district officer  by user ID' })
  @ApiParam({ name: 'userId', required: true, description: 'Recruiter ID' })
  @ApiResponse({
    status: 200,
    description: 'Recruiter data returned',
    type: DistrictOfficer,
  })
  async ByUser(@Param('userId') userId: string) {
    return this.districtOfficerService.getOfficerByUser(userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a district officer by ID' })
  @ApiParam({ name: 'id', description: 'District officer MongoDB ID' })
  @ApiResponse({
    status: 200,
    description: 'District officer updated',
    type: DistrictOfficer,
  })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateDistrictOfficerDto,
  ) {
    return this.districtOfficerService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a district officer by ID' })
  @ApiParam({ name: 'id', description: 'District officer MongoDB ID' })
  @ApiResponse({ status: 200, description: 'District officer deleted' })
  async remove(@Param('id') id: string) {
    return this.districtOfficerService.remove(id);
  }
}
