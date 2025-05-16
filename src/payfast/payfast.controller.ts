import { Controller, Get } from '@nestjs/common';
import { PayfastService } from './payfast.service';

@Controller('payfast')
export class PayfastController {
  constructor(private readonly payfastService: PayfastService) {}

  @Get('token')
  async getToken() {
    const order = {
      basketId: 'ITEM-AZ13',
      amount: '10.00',
      orderDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
      customerEmail: 'customer@example.com',
      customerMobile: '03001234567',
    };

    const result = await this.payfastService.getAccessToken(order);
    console.log(result, 'result with signature');
    return result;
  }
}
