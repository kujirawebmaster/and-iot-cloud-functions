import { Controller, HttpException, Request, Get, Post, Put, Delete, Req, Param, Query, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'
import { catchError, map } from 'rxjs';
const qs = require('qs');

const HOST_PATH = {
  PROD: 'https://api.paypay.ne.jp',
  STAGING: 'https://stg-api.sandbox.paypay.ne.jp',
  PERF_MODE: 'https://perf-api.paypay.ne.jp',
};

@Controller(`payPay/:environment(PROD|STAGING|PERF_MODE)/`)
export class PaymentByPayPayController {
  private logger: Logger = new Logger(PaymentByPayPayController.name);

  constructor(
    private readonly httpService: HttpService,
  ) {}

  @Get('*')
  getApi(
    @Param('environment') environment: 'PROD' | 'STAGING' | 'PERF_MODE',
    @Param() params: string[],
    @Query() queries: string[],
    @Req() request: Request,
  ) {
    const baseUrl = HOST_PATH[environment];
    const queryStr = qs.stringify(queries);
    const url = `${baseUrl}/${params['0']}${(queryStr ? '?' + queryStr : '')}`;
    const requestHeaders = {
      "X-ASSUME-MERCHANT": request.headers["x-assume-merchant"],
      "content-type": request.headers["content-type"],
      "Authorization": request.headers["authorization"],
    };
    this.logger.log(`baseUrl = ${baseUrl}`);
    this.logger.log(`url = ${url}`);
    this.logger.log(`requestHeaders = ${JSON.stringify(requestHeaders)}`);
    return this.httpService.get(url, {
      headers: requestHeaders
    }).pipe(
      map(response => response.data),
      catchError(e => {
        throw new HttpException(e.response.data, e.response.status);
      }),
    );
  }

  @Post('*')
  postApi(
    @Param('environment') environment: 'PROD' | 'STAGING' | 'PERF_MODE',
    @Param() params: string[],
    @Query() queries: string[],
    @Req() request: Request,
  ) {
    const baseUrl = HOST_PATH[environment];
    const queryStr = qs.stringify(queries);
    const url = `${baseUrl}/${params['0']}${(queryStr ? '?' + queryStr : '')}`;
    const requestBody = request.body;
    const requestHeaders = {
      "X-ASSUME-MERCHANT": request.headers["x-assume-merchant"],
      "content-type": request.headers["content-type"],
      "Authorization": request.headers["authorization"],
    };
    this.logger.log(`baseUrl = ${baseUrl}`);
    this.logger.log(`url = ${url}`);
    this.logger.log(`requestHeaders = ${JSON.stringify(requestHeaders)}`);
    this.logger.log(`requestBody = ${JSON.stringify(requestBody)}`);
    return this.httpService.post(url, requestBody, {
      headers: requestHeaders
    }).pipe(
      map(response => response.data),
      catchError(e => {
        throw new HttpException(e.response.data, e.response.status);
      }),
    );
  }

  @Put('*')
  putApi(
    @Param('environment') environment: 'PROD' | 'STAGING' | 'PERF_MODE',
    @Param() params: string[],
    @Query() queries: string[],
    @Req() request: Request,
  ) {
    const baseUrl = HOST_PATH[environment];
    const queryStr = qs.stringify(queries);
    const url = `${baseUrl}/${params['0']}${(queryStr ? '?' + queryStr : '')}`;
    const requestBody = request.body;
    const requestHeaders = {
      "X-ASSUME-MERCHANT": request.headers["x-assume-merchant"],
      "content-type": request.headers["content-type"],
      "Authorization": request.headers["authorization"],
    };
    this.logger.log(`baseUrl = ${baseUrl}`);
    this.logger.log(`url = ${url}`);
    this.logger.log(`requestHeaders = ${JSON.stringify(requestHeaders)}`);
    this.logger.log(`requestBody = ${JSON.stringify(requestBody)}`);
    return this.httpService.put(url, requestBody, {
      headers: requestHeaders
    }).pipe(
      map(response => response.data),
      catchError(e => {
        throw new HttpException(e.response.data, e.response.status);
      }),
    );
  }

  @Delete('*')
  deleteApi(
    @Param('environment') environment: 'PROD' | 'STAGING' | 'PERF_MODE',
    @Param() params: string[],
    @Query() queries: string[],
    @Req() request: Request,
  ) {
    const baseUrl = HOST_PATH[environment];
    const queryStr = qs.stringify(queries);
    const url = `${baseUrl}/${params['0']}${(queryStr ? '?' + queryStr : '')}`;
    const requestHeaders = {
      "X-ASSUME-MERCHANT": request.headers["x-assume-merchant"],
      "content-type": request.headers["content-type"],
      "Authorization": request.headers["authorization"],
    };
    this.logger.log(`baseUrl = ${baseUrl}`);
    this.logger.log(`url = ${url}`);
    this.logger.log(`requestHeaders = ${JSON.stringify(requestHeaders)}`);
    return this.httpService.delete(url, {
      headers: requestHeaders
    }).pipe(
      map(response => response.data),
      catchError(e => {
        throw new HttpException(e.response.data, e.response.status);
      }),
    );
  }
}
