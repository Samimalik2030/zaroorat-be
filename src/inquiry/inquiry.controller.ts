import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { InquiryService } from './inquiry.service';
import { CreateInquiryDto, UpdateInquiryDto } from './inquiry.dto';

@Controller('inquiry')
export class InquiryController {
  constructor(private readonly inquiryService: InquiryService) {}

  @Post()
  async createInquiry(@Body() body: CreateInquiryDto) {
    return await this.inquiryService.store(body);
  }

  @Get()
  async getInquiries() {
    return await this.inquiryService.index();
  }

  @Get(':id')
  async getInquiryById(@Param('id') id: string) {
    return await this.inquiryService.show(id);
  }

  @Patch(':id')
  async updateInquiry(@Param('id') id: string, @Body() body: UpdateInquiryDto) {
    return await this.inquiryService.update(id, body);
  }

  @Delete(':id')
  async deleteInquiry(@Param('id') id: string) {
    return await this.inquiryService.delete(id);
  }
}
