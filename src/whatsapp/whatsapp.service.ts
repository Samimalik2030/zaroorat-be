import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { WhatsappMessageDto } from './whatsapp.dto';

@Injectable()
export class WhatsappService {
  private readonly token = 'EAARn8TwsDMQBOZBrkHUufVBTwjislzaCJq3d8DUL9TZCeuZC1QyeToEfoMrG5CTfqUHZBflJRkIqvVBtmp6W2GNr6xETPZB3Fkrx3NgXBZCSwzjemqyvOZAG2Y9TMdDZBiJpRMAYX0SdwAy05oB1nQedVTc5GC1IB8Vkas9u7Y1McHlnibX2dMBYWqpHSZAhhewkIKnIjiVHwHGqZCqG0VCqZBF4cmvzh7N0TIZD'; 
  private readonly phoneNumberId = '692430513949189';

  private readonly apiUrl = `https://graph.facebook.com/v19.0/${this.phoneNumberId}/messages`;

  private headers = {
    Authorization: `Bearer ${this.token}`,
    'Content-Type': 'application/json',
  };

  async sendTextMessage(to: string, message: string) {
    return this.sendMessage(to, {
      type: 'text',
      text: { body: message },
    });
  }

  async sendImageMessage(to: string, imageUrl: string, caption = '') {
    return this.sendMessage(to, {
      type: 'image',
      image: {
        link: imageUrl,
        caption,
      },
    });
  }

  async sendAudioMessage(to: string, audioUrl: string) {
    return this.sendMessage(to, {
      type: 'audio',
      audio: {
        link: audioUrl,
      },
    });
  }

  private async sendMessage(to: string, content: any) {
    try {
      const response = await axios.post(
        this.apiUrl,
        {
          messaging_product: 'whatsapp',
          to,
          ...content,
        },
        { headers: this.headers },
      );
      return response.data;
    } catch (error) {
      console.error('WhatsApp API Error:', error.response?.data || error.message);
      throw error;
    }
  }
}
