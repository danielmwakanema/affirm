import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { Logger, createLogger } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import ecsFormat from '@elastic/ecs-winston-format';
import { AFFIRM_API_LOG_SIZE, APP_NAME } from '../common/constants';
import { HTTPMetadata } from '../common/types';

@Injectable()
export class LogService {
  private _logger: Logger;

  constructor(private readonly configService: ConfigService) {
    this._logger = createLogger({
      level: 'info',
      format: ecsFormat({ convertReqRes: true }),
      defaultMeta: { service: APP_NAME },
      transports: [this.fileTransport()],
    });
  }

  info(message: string, meta: HTTPMetadata) {
    this._logger.info(message, meta);
  }

  private fileTransport(): DailyRotateFile {
    return new DailyRotateFile({
      filename: `${APP_NAME}-%DATE%.log`,
      dirname: join(__dirname, '..', '..', 'logs'),
      datePattern: 'YYYY-MM-DD-HH',
      maxSize: this.configService.get<string>(AFFIRM_API_LOG_SIZE),
    });
  }
}
