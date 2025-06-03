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
import { Salesman } from './salesman.mongo';
import { SalesmanService } from './salesman.service';
import { CreateSalesmanDto, SalesmanQueryDto } from './salesman.dto';


@ApiTags('Salesman')
@Controller('salesman')
export class SalesmanController {
  constructor(private readonly SalesmanOfficerService: SalesmanService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Salesman' })
  @ApiBody({ type: CreateSalesmanDto })
  @ApiResponse({
    status: 201,
    description: 'Salesman created successfully',
    type: Salesman,
  })
  create(@Body() createDto: CreateSalesmanDto) {
    return this.SalesmanOfficerService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Salesmans with optional filters' })
  @ApiResponse({
    status: 200,
    description: 'List of Salesmans',
    type: [Salesman],
  })
  getAll(@Query() query: SalesmanQueryDto) {
    return this.SalesmanOfficerService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Salesman by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Salesman ID' })
  @ApiResponse({
    status: 200,
    description: 'Salesman data returned',
    type: Salesman,
  })
  getById(@Param('id') id: string) {
    return this.SalesmanOfficerService.findById(id);
  }

 @Get('/user/:userId')
  @ApiOperation({ summary: 'Get a Salesman by user ID' })
  @ApiParam({ name: 'userId', required: true, description: 'Salesman ID' })
  @ApiResponse({
    status: 200,
    description: 'Salesman data returned',
    type: Salesman,
  })
  getSalesmanByUser(@Param('userId') userId: string) {
    return this.SalesmanOfficerService.getSalesmanByUser(userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a Salesman by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Salesman ID' })
  @ApiBody({ type: CreateSalesmanDto })
  @ApiResponse({
    status: 200,
    description: 'Salesman updated successfully',
    type: Salesman,
  })
  update(
    @Param('id') id: string,
    @Body() updateDto: Partial<CreateSalesmanDto>,
  ) {
    return this.SalesmanOfficerService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Salesman by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Salesman ID' })
  @ApiResponse({ status: 200, description: 'Salesman deleted successfully' })
  delete(@Param('id') id: string) {
    return this.SalesmanOfficerService.delete(id);
  }
}
