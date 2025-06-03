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
import {
  CreateDistrictOfficerDto,
  DistrictOfficerQueryDto,
  UpdateDistrictOfficerDto,
} from './city-officers.dto';
import { CityOfficer } from './city-officers.mongo';
import { CityOfficerService } from './city-officers.service';

@ApiTags('City Officers')
@Controller('city-officers')
export class CityOfficerController {
  constructor(
    private readonly cityOfficerService: CityOfficerService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new district officer' })
  @ApiResponse({
    status: 201,
    description: 'District officer created',
    type: CityOfficer,
  })
  async create(@Body() createDto: CreateDistrictOfficerDto) {
    return this.cityOfficerService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all district officers with optional filters' })
  @ApiResponse({
    status: 200,
    description: 'List of district officers',
    type: [CityOfficer],
  })
  async findAll(@Query() query: DistrictOfficerQueryDto) {
    return this.cityOfficerService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a district officer by ID' })
  @ApiParam({ name: 'id', description: 'District officer MongoDB ID' })
  @ApiResponse({
    status: 200,
    description: 'District officer found',
    type: CityOfficer,
  })
  async findOne(@Param('id') id: string) {
    return this.cityOfficerService.findById(id);
  }

  @Get('/user/:userId')
  @ApiOperation({ summary: 'Get a district officer  by user ID' })
  @ApiParam({ name: 'userId', required: true, description: 'Recruiter ID' })
  @ApiResponse({
    status: 200,
    description: 'Recruiter data returned',
    type: CityOfficer,
  })
  async ByUser(@Param('userId') userId: string) {
    return this.cityOfficerService.getOfficerByUser(userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a district officer by ID' })
  @ApiParam({ name: 'id', description: 'District officer MongoDB ID' })
  @ApiResponse({
    status: 200,
    description: 'District officer updated',
    type: CityOfficer,
  })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateDistrictOfficerDto,
  ) {
    return this.cityOfficerService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a district officer by ID' })
  @ApiParam({ name: 'id', description: 'District officer MongoDB ID' })
  @ApiResponse({ status: 200, description: 'District officer deleted' })
  async remove(@Param('id') id: string) {
    return this.cityOfficerService.remove(id);
  }
}
