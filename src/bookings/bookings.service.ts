import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from './bookings.mongo';
import { ImageKitService } from 'src/image-kit/image-kit.service';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
    private readonly imageKitService: ImageKitService,
  ) {}

  // Create a booking; if audioFile is provided, upload it using ImageKitService
  async createBooking(
    bookingData: Partial<Booking>,
    audioFile?: Express.Multer.File,
  ): Promise<Booking> {
    if (audioFile) {
      const uploadResult = await this.imageKitService.uploadImage(audioFile);
    //   bookingData.voiceUrl = uploadResult.url; // Assuming uploadFile returns { url: string, ... }
    }

    const booking = new this.bookingModel(bookingData);
    return booking.save();
  }

  async getBookingById(id: string): Promise<Booking> {
    const booking = await this.bookingModel.findById(id).exec();
    if (!booking) {
      throw new NotFoundException(`Booking with id ${id} not found`);
    }
    return booking;
  }

  async updateBooking(
    id: string,
    updateData: Partial<Booking>,
  ): Promise<Booking> {
    const updatedBooking = await this.bookingModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true },
    );
    if (!updatedBooking) {
      throw new NotFoundException(`Booking with id ${id} not found`);
    }
    return updatedBooking;
  }
}
