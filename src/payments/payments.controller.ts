import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentSessionDto } from './dto/payment-session.dto';
import { Request, Response } from 'express';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}
  @Post('create-payment-session')
  createPaymentSession(@Body() paymentSessionDto: PaymentSessionDto) {
    //console.log('Currency----------', paymentSessionDto.currency);
    return this.paymentsService.createPaymentSession(paymentSessionDto);
  }
  @Get('success')
  success() {
    return {
      ok: true,
      message: 'payment successful',
    };
  }
  @Get('cancel')
  cancel() {
    return {
      ok: false,
      message: 'Payment cancelled',
    };
  }
  @Post('webhook')
  async stripeWebHook(@Req() req: Request, @Res() res: Response) {
    console.log('stripe WebHook called');
    return this.paymentsService.stripeWebhook(req, res);
  }
}
