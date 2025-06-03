import {
  Controller,
  Post,
  Get,
  Put,
  Param,
  Body,
  NotFoundException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ApiTags, ApiConsumes, ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Booking } from './bookings.mongo';
import { BookingService } from './bookings.service';

@ApiTags('bookings')
@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new booking (with optional audio upload)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        user: { type: 'string', example: '60f7a1c5e5b3a72b3c8a830f' },
        professional: { type: 'string', example: '60f7a1c5e5b3a72b3c8a830f' },
        bookingDateTime: { type: 'string', format: 'date-time' },
        status: { type: 'string', example: 'PENDING' },
        notes: { type: 'string', example: 'Please be on time.' },
        serviceAddress: { type: 'string', example: '123 Main Street' },
        audioFile: {
          type: 'string',
          format: 'binary',
          description: 'Optional voice recording file',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('audioFile'))
  async createBooking(
    @Body() bookingData: Partial<Booking>,
    @UploadedFile() audioFile?: Express.Multer.File,
  ): Promise<Booking> {
    return this.bookingService.createBooking(bookingData, audioFile);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get booking by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Booking ID' })
  async getBooking(@Param('id') id: string): Promise<Booking> {
    const booking = await this.bookingService.getBookingById(id);
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    return booking;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update booking by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Booking ID' })
  async updateBooking(
    @Param('id') id: string,
    @Body() updateData: Partial<Booking>,
  ): Promise<Booking> {
    return this.bookingService.updateBooking(id, updateData);
  }
}
