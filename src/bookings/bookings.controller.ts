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
  UploadedFiles,
  Patch,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiConsumes,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import {
  AnyFilesInterceptor,
  FileInterceptor,
  FilesInterceptor,
  NoFilesInterceptor,
} from '@nestjs/platform-express';
import { Booking } from './bookings.mongo';
import { BookingService } from './bookings.service';
import { BookingQueryDTO, CreateBookingDto, PatchProfessionalDTO } from './bookings.dto';

@ApiTags('bookings')
@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new booking (with optional audio and images)',
  })
  @ApiConsumes('multipart/form-data')
  // @ApiBody({ type: CreateBookingDto })
  // @UseInterceptors(
  //   FileInterceptor('audio'),
  //   FilesInterceptor('images', 10),
  // )
  @UseInterceptors(AnyFilesInterceptor())
  async createBooking(
    @Body() body: any,
    @UploadedFile() audio?: Express.Multer.File,
    @UploadedFiles() images?: Express.Multer.File[],
  ): Promise<any> {
    console.log(body);
    return this.bookingService.createBooking(body, audio, images);
  }
// @Get()

// async findAll(@Query() query: ProfessionalQueryDto): Promise<Professional[]> {
//   return this.professionalService.findAll(query);
// }
  @Get()
@ApiOperation({ summary: 'Get all bookings with optional filters' })
@ApiResponse({ status: 200, description: 'List of Bookings', type: [Booking] })
  async getAllBooking(@Query() query: BookingQueryDTO): Promise<Booking[]> {
    return this.bookingService.findAll(query);
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

  @Patch(':id')
  @ApiOperation({ summary: 'Update booking by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Booking ID' })
  async updateBooking(
    @Param('id') id: string,
    @Body() updateData: Partial<Booking>,
  ): Promise<Booking> {
    return this.bookingService.updateBooking(id, updateData);
  }

  @Patch(':id/patch-professional')
  @ApiOperation({ summary: 'Update booking by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Booking ID' })
  async updateProfessional(
    @Param('id') id: string,
    @Body() updateData: PatchProfessionalDTO,
  ): Promise<Booking> {
    return this.bookingService.patchProfessional(id, updateData.professionalId);
  }
}
