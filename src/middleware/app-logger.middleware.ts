import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('DEBUG REQUEST LOGS');

  use(request: any, response: any, next: any): void {
    const now = Date.now();

    response.on('close', () => {
      const delay = Date.now() - now;

      this.logger.log(`[${request.url}]: handel time ${delay}ms`);
    });
    next();
  }
}
