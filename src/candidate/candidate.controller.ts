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
  UseGuards,
  Req,
  Patch,
} from '@nestjs/common';
import { CandidateService } from './candidate.service';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Candidate } from './schema/candidate.monogo';
import { CreatePersonalInfoDto } from './candidate.dto';
import { JwtAuthGuard } from 'src/guards/jwtAuthGuard';
import { Request } from 'express';

@ApiTags('Candidates')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('candidates')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new candidate application' })
  @ApiResponse({
    status: 201,
    description: 'Candidate created',
    type: Candidate,
  })
  @ApiBody({ type: CreatePersonalInfoDto })
  async create(
    @Body() createCandidateDto: CreatePersonalInfoDto,
    @Req() req:Request
  ): Promise<Candidate> {
    console.log(req.user)
    return this.candidateService.create(createCandidateDto,req.user._id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all candidates' })
  @ApiResponse({
    status: 200,
    description: 'List of candidates',
    type: [Candidate],
  })
  async findAll(): Promise<Candidate[]> {
    return this.candidateService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a candidate by ID' })
  @ApiParam({ name: 'id', description: 'Candidate ID' })
  @ApiResponse({ status: 200, description: 'Candidate found', type: Candidate })
  @ApiResponse({ status: 404, description: 'Candidate not found' })
  async findOne(@Param('id') id: string): Promise<Candidate> {
    return this.candidateService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a candidate' })
  @ApiParam({ name: 'id', description: 'Candidate ID' })
    @ApiBody({ type: Candidate })
  @ApiResponse({
    status: 200,
    description: 'Candidate updated',
    type: Candidate,
  })
  @ApiResponse({ status: 404, description: 'Candidate not found' })
  async update(
    @Param('id') id: string,
    @Body() updateCandidateDto: Partial<Candidate>,
  ): Promise<Candidate> {
    return this.candidateService.update(id, updateCandidateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a candidate' })
  @ApiParam({ name: 'id', description: 'Candidate ID' })
  @ApiResponse({ status: 204, description: 'Candidate deleted' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.candidateService.remove(id);
  }


   @Get('/user/:userId')
    @ApiOperation({ summary: 'Get a Candidate  by user ID' })
    @ApiParam({ name: 'userId', required: true, description: 'Candidate ID' })
    @ApiResponse({
      status: 200,
      description: 'Candidate data returned',
      type: Candidate,
    })
    async ByUser(@Param('userId') userId: string) {
      return this.candidateService.getOfficerByUser(userId);
    }
}
