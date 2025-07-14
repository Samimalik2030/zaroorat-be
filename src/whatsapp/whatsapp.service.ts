import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { WhatsappMessageDto } from './whatsapp.dto';

@Injectable()
export class WhatsappService {
  private readonly token = 'EAARn8TwsDMQBOZC0ubuVEJ8rRMvQ44WM1LMs1WpKCxdn6iW2oXfcZAXJCBzPX8fDNOdl6YULQZB40CiyrWekev2MhZAdZCPohXsJBjIVk39pWunZCCcDZA70PFZAFffBZCWTP1EdBIOBSzgG67HWX9XavlUgovMJsVIKCCdSJ6bNFqeP8mh3838KSMBu0cYg6tJ1JP4AvLmItXxtoMVZCuySKCKqMxP90jnogZD'; 
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
