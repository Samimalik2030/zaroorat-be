import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AdminAnalyticsDto } from './admin.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

}
