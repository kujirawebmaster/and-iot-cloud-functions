import { Controller, HttpException, Get } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'
import { AppService } from './app.service';
import { catchError, map } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly httpService: HttpService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('check')
  check() {
    // 
    // status 200 パターン
    // 
    const url = `https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty`;
    return this.httpService.get(url).pipe(
      map(response => response.data),
      catchError(e => {
        throw new HttpException(e.response.data, e.response.status);
      }),
    );

    // 
    // status 200 以外パターン
    // 
    // const url = `https://api.connected-platform.com/v1/rest/assignments`;
    // return this.httpService.get(url, {
    //   headers: {
    //     'Content-Type': 'application/json;charset=utf-8',
    //     'Authorization': `Basic ${Buffer.from(`airbnb@device-agency.co.jp:password`).toString('base64')}`
    //   }
    // }).pipe(
    //   map(response => response.data),
    //   // catchError(e => { throw e; }),
    //   catchError(e => {
    //     throw new HttpException(e.response.data, e.response.status);
    //   }),
    // );
  }
  // @Get('check')
  // async check() {
  //   // const url = `https://fuga.work`;
  //   // const url = `https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty`;
  //   // const url = `https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty`;
  //   const url = `https://api.connected-platform.com/v1/rest/assignments`
  //   const subscribe = this.httpService.get(url);
  //   try {
  //     const response = await lastValueFrom(subscribe);
  //     console.log(`status = ${response.status}`);
  //     console.log(`data = ${JSON.stringify(response.data)}`);
  //     return Promise.resolve(response.data);
  //   }
  //   catch (error) {
  //     console.log(JSON.stringify(error));
  //     const {
  //       status,
  //       statusText
  //     } = error.response;
  //     console.log(`Error! HTTP Status: ${status} ${statusText}`);
  //     throw error;
  //   }
  // }
}
