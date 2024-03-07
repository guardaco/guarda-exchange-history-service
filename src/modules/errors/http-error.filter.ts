import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    let status = 500;
    if (exception?.getStatus) {
      status = exception.getStatus();
    } else if (exception?.status) {
      status = exception?.status;
    } else if (exception?.response?.status) {
      status = exception?.response?.status;
    }
    const responseMessage = exception.getResponse
      ? exception.getResponse()
      : '';
    const errorResponse = {
      code: status,
      path: request.url,
      method: request.method,
      message: exception.message,
      responseMessage,
    };

    response.status(status).json(errorResponse);
  }
}
