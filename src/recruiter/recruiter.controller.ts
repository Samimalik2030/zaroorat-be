import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { RecruiterService } from './recruiter.service';
import { CreateRecruiterDto, RecruiterQueryDto } from './recruiter.dto';
import { Recruiter } from './recruiter.mongo';

@ApiTags('Recruiters')
@Controller('recruiters')
export class RecruiterController {
  constructor(private readonly recruiterService: RecruiterService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new recruiter' })
  @ApiBody({ type: CreateRecruiterDto })
  @ApiResponse({
    status: 201,
    description: 'Recruiter created successfully',
    type: Recruiter,
  })
  create(@Body() createDto: CreateRecruiterDto) {
    return this.recruiterService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all recruiters with optional filters' })
  @ApiResponse({
    status: 200,
    description: 'List of recruiters',
    type: [Recruiter],
  })
  getAll(@Query() query: RecruiterQueryDto) {
    return this.recruiterService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a recruiter by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Recruiter ID' })
  @ApiResponse({
    status: 200,
    description: 'Recruiter data returned',
    type: Recruiter,
  })
  getById(@Param('id') id: string) {
    return this.recruiterService.findById(id);
  }

 @Get('/user/:userId')
  @ApiOperation({ summary: 'Get a recruiter by user ID' })
  @ApiParam({ name: 'userId', required: true, description: 'Recruiter ID' })
  @ApiResponse({
    status: 200,
    description: 'Recruiter data returned',
    type: Recruiter,
  })
  getRecruiterByUser(@Param('userId') userId: string) {
    return this.recruiterService.getRecruiterByUser(userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a recruiter by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Recruiter ID' })
  @ApiBody({ type: CreateRecruiterDto })
  @ApiResponse({
    status: 200,
    description: 'Recruiter updated successfully',
    type: Recruiter,
  })
  update(
    @Param('id') id: string,
    @Body() updateDto: Partial<CreateRecruiterDto>,
  ) {
    return this.recruiterService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a recruiter by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Recruiter ID' })
  @ApiResponse({ status: 200, description: 'Recruiter deleted successfully' })
  delete(@Param('id') id: string) {
    return this.recruiterService.delete(id);
  }
}
