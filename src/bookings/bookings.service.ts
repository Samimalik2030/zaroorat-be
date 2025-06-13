import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from './bookings.mongo';
import { ImageKitService } from 'src/image-kit/image-kit.service';
import { BookingQueryDTO, CreateBookingDto } from './bookings.dto';
import { UserService } from 'src/user/user.service';
import { ProfessionalService } from 'src/professional/professional.service';
import { WhatsappService } from 'src/whatsapp/whatsapp.service';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
    private readonly imageKitService: ImageKitService,
    private readonly userService: UserService,
    private readonly professionalService: ProfessionalService,
    private readonly whatsappService: WhatsappService,
  ) {}

  async findAll(query: BookingQueryDTO): Promise<Booking[]> {
    const filter: any = {};

    if (query.city) {
      filter.city = query.city;
    }

    if (query.status) {
      filter.status = query.status;
    }

    return await this.bookingModel
      .find(filter)
      .populate('professional', 'user')
      .exec();
  }

  async createBooking(data: any, audio: any, images: any): Promise<Booking> {
    const bookingData: any = {
      ...data,
    };
    console.log(audio, 'audio');
    if (images) {
      const uploadedImages = await this.imageKitService.uploadImages(images);
      bookingData.images = uploadedImages;
    }

    if (audio) {
      const uploadedAudio = await this.imageKitService.uploadImage(audio);
      console.log(uploadedAudio);
      bookingData.audio = uploadedAudio;
    }

    const user = await this.userService.findById(data.user);
    bookingData.user = user;

    return await this.bookingModel.create(bookingData);
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

  async patchProfessional(id: string, professionalId: string) {
    const professional = await this.professionalService.findOne(professionalId);
    if (!professional) {
      throw new NotFoundException('Invalid professional key');
    }
    const updatedBooking = await this.bookingModel.findByIdAndUpdate(
      id,
      {
        professional: professional,
      },
      {
        returnDocument: 'after',
      },
    );
    await this.whatsappService.sendTextMessage(
      '923085710094',
      `📍 Address: ${updatedBooking.address}\n📝 Description: ${updatedBooking.description}.`,
    );

    if (updatedBooking.images.length > 0) {
      for (const image of updatedBooking.images) {
        await this.whatsappService.sendImageMessage('923085710094', image.url);
        await new Promise((res) => setTimeout(res, 500)); 
      }
    }
    return updatedBooking;
  }
}
