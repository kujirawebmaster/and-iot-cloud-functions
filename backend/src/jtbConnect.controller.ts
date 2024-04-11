import { Controller, HttpException, Request, Get, Post, Put, Delete, Req, Param, Query, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'
import { AppService } from './app.service';
import { catchError, map } from 'rxjs';
const qs = require('qs');

const HOST_PATH = {
  production: 'https://dch.jtb.co.jp',
  develop: 'https://stg.dch.jtb.co.jp',
  local: 'https://stg.dch.jtb.co.jp',
};

@Controller('jtbConnect')
export class PmsJtbConnectController {
  constructor(
    private readonly httpService: HttpService,
  ) {}
  private logger: Logger = new Logger(PmsJtbConnectController.name);


  @Get('*')
  getApi(
    @Param() params: string[],
    @Query() queries: string[],
    @Req() request: Request,
  ) {
    const baseUrl = HOST_PATH[process.env.NODE_ENV ?? 'local'];

    const queryStr = qs.stringify(queries);
    const url = `${baseUrl}/${params['0']}${(queryStr ? '?' + queryStr : '')}`;
    const requestHeaders = {
      "Ocp-Apim-Subscription-Key": request.headers["ocp-apim-subscription-key"],
      "content-type": request.headers["content-type"]
    };
    return this.httpService.get(url, {
      headers: requestHeaders
    }).pipe(
      map(response => response.data),
      catchError(e => {
        throw e;
      }),
    );
  }

  @Post('*')
  postApi(
    @Param() params: string[],
    @Query() queries: string[],
    @Req() request: Request,
  ) {
    const baseUrl = HOST_PATH[process.env.NODE_ENV ?? 'local'];

    const queryStr = qs.stringify(queries);
    const url = `${baseUrl}/${params['0']}${(queryStr ? '?' + queryStr : '')}`;
    const requestBody = request.body;
    const requestHeaders = {
      "Ocp-Apim-Subscription-Key": request.headers["ocp-apim-subscription-key"],
      "content-type": request.headers["content-type"]
    };
    this.logger.log(`baseUrl = ${baseUrl}`);
    this.logger.log(`url = ${url}`);
    this.logger.log(`requestHeaders = ${JSON.stringify(requestHeaders)}`);
    return this.httpService.post(url, requestBody, {
      headers: requestHeaders
    }).pipe(
      map(response => response.data),
      catchError(e => {
        throw e;
      }),
    );
  }

  @Put('*')
  putApi(
    @Param() params: string[],
    @Query() queries: string[],
    @Req() request: Request,
  ) {
    const baseUrl = HOST_PATH[process.env.NODE_ENV ?? 'local'];

    const queryStr = qs.stringify(queries);
    const url = `${baseUrl}/${params['0']}${(queryStr ? '?' + queryStr : '')}`;
    const requestBody = request.body;
    const requestHeaders = {
      "Ocp-Apim-Subscription-Key": request.headers["ocp-apim-subscription-key"],
      "content-type": request.headers["content-type"]
    };
    return this.httpService.put(url, requestBody, {
      headers: requestHeaders
    }).pipe(
      map(response => response.data),
      catchError(e => {
        throw e;
      }),
    );
  }

  @Delete('*')
  deleteApi(
    @Param() params: string[],
    @Query() queries: string[],
    @Req() request: Request,
  ) {
    const baseUrl = HOST_PATH[process.env.NODE_ENV ?? 'local'];

    const queryStr = qs.stringify(queries);
    const url = `${baseUrl}/${params['0']}${(queryStr ? '?' + queryStr : '')}`;
    const requestBody = request.body;
    const requestHeaders = {
      "Ocp-Apim-Subscription-Key": request.headers["ocp-apim-subscription-key"],
      "content-type": request.headers["content-type"]
    };
    return this.httpService.delete(url, {
      headers: requestHeaders
    }).pipe(
      map(response => response.data),
      catchError(e => {
        throw e;
      }),
    );
  }
}
