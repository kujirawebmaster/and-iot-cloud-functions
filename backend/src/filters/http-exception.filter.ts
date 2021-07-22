import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();

    console.error(`Error! HTTP Status: ${status} ${exceptionResponse.message}`);

    response
      .status(status)
      .json({
        ...exceptionResponse,
        timestamp: new Date().toISOString(),
        path: request.url
      });
  }
}
