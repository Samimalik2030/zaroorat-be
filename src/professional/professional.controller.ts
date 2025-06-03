import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  Patch,
  Query,
} from '@nestjs/common';
import { ProfessionalService } from './professional.service';

import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateProfessionalDto, ProfessionalQueryDto } from './professional.dto';
import { Professional } from './professional.mongo';


@ApiTags('professionals')
@Controller('professionals')
export class ProfessionalController {
  constructor(private readonly professionalService: ProfessionalService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new professional' })
  @ApiBody({ type: CreateProfessionalDto })
  @ApiResponse({ status: 201, description: 'Professional created successfully', type: Professional })
  async create(@Body() createProfessionalDto: CreateProfessionalDto): Promise<Professional> {
    return this.professionalService.create(createProfessionalDto);
  }

@Get()
@ApiOperation({ summary: 'Get all professionals with optional filters' })
@ApiResponse({ status: 200, description: 'List of professionals', type: [Professional] })
async findAll(@Query() query: ProfessionalQueryDto): Promise<Professional[]> {
  return this.professionalService.findAll(query);
}


  @Get(':id')
  @ApiOperation({ summary: 'Get a professional by ID' })
  @ApiParam({ name: 'id', description: 'Professional ID' })
  @ApiResponse({ status: 200, description: 'Professional found', type: Professional })
  @ApiResponse({ status: 404, description: 'Professional not found' })
  async findOne(@Param('id') id: string): Promise<Professional> {
    return this.professionalService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a professional by ID' })
  @ApiParam({ name: 'id', description: 'Professional ID' })
  @ApiBody({ type: CreateProfessionalDto })
  @ApiResponse({ status: 200, description: 'Professional updated', type: Professional })
  @ApiResponse({ status: 404, description: 'Professional not found' })
  async update(
    @Param('id') id: string,
    @Body() updateProfessionalDto: CreateProfessionalDto,
  ): Promise<Professional> {
    return this.professionalService.update(id, updateProfessionalDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a professional by ID' })
  @ApiParam({ name: 'id', description: 'Professional ID' })
  @ApiResponse({ status: 204, description: 'Professional deleted' })
  @ApiResponse({ status: 404, description: 'Professional not found' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.professionalService.remove(id);
  }
}
