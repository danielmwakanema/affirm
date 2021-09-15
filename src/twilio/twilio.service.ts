import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Twilio from 'twilio';
import { AFFIRM_API_VOICE_DELAY } from 'src/common/constants';

@Injectable()
export class TwilioService {
  constructor(private readonly configService: ConfigService) {}

  say(sentence: string): string {
    const delay = this.configService.get<string>(AFFIRM_API_VOICE_DELAY);
    const response = new Twilio.twiml.VoiceResponse();
    const say = response.say(sentence);
    say.break_({ time: delay });
    return response.toString();
  }
}
