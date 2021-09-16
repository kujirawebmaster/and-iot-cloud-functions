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

  @Get('hackerNews')
  getHackerNews() {
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
  }
}
