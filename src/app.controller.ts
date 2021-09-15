import { Controller, Header, Post, UseInterceptors } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { AffirmationsService } from './affirmations/affirmations.service';
import { LogInterceptor } from './log/interceptors/log.interceptor';
import { TwilioService } from './twilio/twilio.service';

@UseInterceptors(LogInterceptor)
@Controller()
export class AppController {
  constructor(
    private readonly affirmationsService: AffirmationsService,
    private readonly twilioService: TwilioService,
  ) {}

  @ApiCreatedResponse({ type: String })
  @ApiInternalServerErrorResponse()
  @Post()
  @Header('Content-Type', 'text/html')
  async random(): Promise<string> {
    const { body } = await this.affirmationsService.random();
    return this.twilioService.say(body);
  }
}
