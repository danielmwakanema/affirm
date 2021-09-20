import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LogService } from '../../log/log.service';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  constructor(private readonly logService: LogService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap(() => {
        const httpContext = context.switchToHttp();
        const req = httpContext.getRequest<Request>();
        const res = httpContext.getResponse<Response>();

        const message = `Performing ${req.method} to ${req.path}`;

        this.logService.info(message, { req, res });
      }),
    );
  }
}
