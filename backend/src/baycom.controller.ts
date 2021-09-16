import { Controller, HttpException, Request, Get, Post, Put, Delete, Req, Param, Query } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'
import { AppService } from './app.service';
import { catchError, map } from 'rxjs';
const qs = require('qs');

const baseUrl = 'https://api.connected-platform.com/v1/';

@Controller('baycom')
export class BaycomController {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  @Get('*')
  getApi(
    @Param() params: string[],
    @Query() queries: string[],
    @Req() request: Request,
  ) {
    const queryStr = qs.stringify(queries);
    const url = baseUrl + params['0'] + (queryStr ? '?' + queryStr : '');
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
    @Param() params: string[],
    @Query() queries: string[],
    @Req() request: Request,
  ) {
    const queryStr = qs.stringify(queries);
    const url = baseUrl + params['0'] + (queryStr ? '?' + queryStr : '');
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
    @Param() params: string[],
    @Query() queries: string[],
    @Req() request: Request,
  ) {
    const queryStr = qs.stringify(queries);
    const url = baseUrl + params['0'] + (queryStr ? '?' + queryStr : '');
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
    @Param() params: string[],
    @Query() queries: string[],
    @Req() request: Request,
  ) {
    const queryStr = qs.stringify(queries);
    const url = baseUrl + params['0'] + (queryStr ? '?' + queryStr : '');
    const requestBody = request.body;
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
