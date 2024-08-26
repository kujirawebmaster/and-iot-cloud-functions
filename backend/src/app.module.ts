// import { HttpModule } from '@nestjs/axios';
import { Module, } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BaycomController } from './baycom.controller';
import { KeyvoxController } from './keyvox.controller';
import { PaymentByPayPayController } from './payPay.controller';
import { PmsJtbConnectController } from './jtbConnect.controller';

@Module({
  imports: [
    HttpModule,
  ],
  controllers: [
    AppController,
    BaycomController,
    KeyvoxController,
    PaymentByPayPayController,
    PmsJtbConnectController,
  ],
  providers: [AppService],
})
export class AppModule {}
