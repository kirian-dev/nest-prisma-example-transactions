/* eslint-disable prettier/prettier */
import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreditCard } from '@prisma/client';
import { CreateCreditCardDto } from './dto/create-card.dto';

@Controller('credit-cards')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post()
  async createCreditCard(
    @Body() createCreditCardDto: CreateCreditCardDto,
  ): Promise<CreditCard> {
    const {
      cardNumber,
      holderName,
      expirationDate,
      cvv,
      userId,
    } = createCreditCardDto;

    try {
      if (!cardNumber && !cardNumber && !expirationDate && !cvv && !userId) {
        throw new BadRequestException("Invalid parameters")
      }
      const createdCreditCard = await this.appService.createCreditCardWithTransaction(
        cardNumber,
        holderName,
        expirationDate,
        cvv,
        userId,
      );

      return createdCreditCard;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new BadRequestException('Unexpected error occurred');
    }
  }
}

