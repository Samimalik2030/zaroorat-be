import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Inquiry } from './inquiry.mongo';
import { Model } from 'mongoose';
import { CreateInquiryDto, UpdateInquiryDto } from './inquiry.dto';

@Injectable()
export class InquiryService {
  constructor(
    @InjectModel(Inquiry.name) private inquiryModel: Model<Inquiry>,
  ) {}

  async index() {
    return await this.inquiryModel.find().exec();
  }

  async store(body: CreateInquiryDto) {
    const inquiry = await this.inquiryModel.create(body);
    return {
      message:
        'Thank you.Your message has been sent to support team they will contact you in short',
      inquiry: inquiry,
    };
  }

  async show(id: string) {
    return await this.inquiryModel.findById(id).exec();
  }

  async update(id: string, body: UpdateInquiryDto) {
    return await this.inquiryModel
      .findByIdAndUpdate(id, body, { new: true })
      .exec();
  }

  async delete(id: string) {
    return await this.inquiryModel.findByIdAndDelete(id).exec();
  }
}
