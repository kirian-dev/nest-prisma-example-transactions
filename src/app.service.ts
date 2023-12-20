import { Injectable } from '@nestjs/common';
import { AppRepository } from './app.repository';
import { CreditCard } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private readonly appRepository: AppRepository) {}

  async createCreditCardWithTransaction(
    cardNumber: string,
    holderName: string,
    expirationDate: string,
    cvv: string,
    userId: number,
  ): Promise<CreditCard> {
    try {
      return this.appRepository.createCreditCardWithTransaction(
        userId,
        holderName,
        expirationDate,
        cvv,
        cardNumber,
      );
    } catch (error) {
      throw new Error(error);
    }
  }
}
