// import { HttpModule } from '@nestjs/axios';
import { Module, } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BaycomController } from './baycom.controller';
import { KeyvoxController } from './keyvox.controller';
import { PaymentByPayPayController } from './payPay.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [
    AppController,
    BaycomController,
    KeyvoxController,
    PaymentByPayPayController,
  ],
  providers: [AppService],
})
export class AppModule {}
