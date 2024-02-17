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
    this.logger.log(`baseUrl = ${baseUrl}`);

    const queryStr = qs.stringify(queries);
    const url = `${baseUrl}/${params['0']}${(queryStr ? '?' + queryStr : '')}`;
    this.logger.log(`url = ${url}`);
    const requestHeaders: any = request.headers;
    if (requestHeaders.host !== undefined) {
      delete requestHeaders.host
    }
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
    const requestHeaders: any = request.headers;
    if (requestHeaders.host !== undefined) {
      delete requestHeaders.host
    }
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
    const requestHeaders: any = request.headers;
    if (requestHeaders.host !== undefined) {
      delete requestHeaders.host
    }
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
    const requestHeaders: any = request.headers;
    if (requestHeaders.host !== undefined) {
      delete requestHeaders.host
    }
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
