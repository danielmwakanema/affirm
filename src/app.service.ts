import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { nerdvision } from '@nerdvision/agent';
import { AFFIRM_NERD_VISION_KEY } from './common/constants';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  onApplicationBootstrap() {
    const key = this.configService.get<string>(AFFIRM_NERD_VISION_KEY);
    nerdvision.start(key);
  }
}
