import { Injectable } from "@nestjs/common";
import axios from "axios";
import * as crypto from "crypto";

@Injectable()
export class PayfastService {
  private readonly tokenUrl = 'https://ipguat.apps.net.pk/Ecommerce/api/Transaction/GetAccessToken';
  private readonly securedKey = 'zWHjBp2AlttNu1sK';

  async getAccessToken(order: {
    basketId: string;
    amount: string;         
    orderDate: string;        
    customerEmail: string;
    customerMobile?: string;
  }): Promise<{
    token: string;
    basket_id: string;
    txn_amt: string;
    order_date: string;
    signature: string;
  }> {
    const params = new URLSearchParams();   

    params.append('MERCHANT_ID', '102');
    params.append('SECURED_KEY', this.securedKey);
    params.append('BASKET_ID', order.basketId);
    params.append('TXNAMT', order.amount);
    params.append('CURRENCY_CODE', 'PKR');
    params.append('ORDER_DATE', order.orderDate);
    params.append('MERCHANT_NAME', 'Demo Merchant');
    params.append('CUSTOMER_EMAIL_ADDRESS', order.customerEmail);
    params.append('CUSTOMER_MOBILE_NO', order.customerMobile || '0000000000');
    params.append('TXDESC', 'Item Purchased from Cart');
    params.append('PROCCODE', '00');
    params.append('TRAN_TYPE', 'ECOMM_PURCHASE');
    params.append('VERSION', 'MERCHANTCART-0.1');

    try {
      const response = await axios.post(this.tokenUrl, params.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      const token = response.data.ACCESS_TOKEN;
      if (!token) throw new Error('No token received');

      // Prepare params for signature generation (exclude SECURED_KEY)
      const signatureParams = {
        MERCHANT_ID: '102',
        BASKET_ID: order.basketId,
        TXNAMT: order.amount,
        CURRENCY_CODE: 'PKR',
        ORDER_DATE: order.orderDate,
        MERCHANT_NAME: 'Demo Merchant',
        CUSTOMER_EMAIL_ADDRESS: order.customerEmail,
        CUSTOMER_MOBILE_NO: order.customerMobile || '0000000000',
        TXDESC: 'Item Purchased from Cart',
        PROCCODE: '00',
        TRAN_TYPE: 'ECOMM_PURCHASE',
        VERSION: 'MERCHANTCART-0.1',
        TOKEN: token,
      };

      const signature = this.generateSignature(signatureParams);

      return {
        token,
        basket_id: order.basketId,
        txn_amt: order.amount,
        order_date: order.orderDate,
        signature,
      };
    } catch (error) {
      console.error('Token Error:', error.response?.data || error.message);
      throw new Error('Failed to get PayFast token');
    }
  }

  private generateSignature(params: Record<string, string>): string {
    // Sort keys alphabetically
    const sortedKeys = Object.keys(params).sort();

    // Create the string to hash (key=value&key2=value2...)
    const stringToHash = sortedKeys
      .map(key => `${key}=${params[key]}`)
      .join('&') + this.securedKey; // append secured key at the end

    // MD5 hash
    return crypto.createHash('md5').update(stringToHash).digest('hex');
  }
}
