import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentSessionDto } from './dto/payment-session.dto';
import { Request, Response } from 'express';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}
  //@Post('create-payment-session')
  @MessagePattern('create.payments.session')
  createPaymentSession(@Payload() paymentSessionDto: PaymentSessionDto) {
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
