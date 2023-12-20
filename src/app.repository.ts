/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { CreditCard, } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppRepository {
  private readonly logger = new Logger(AppRepository.name);

  constructor(private readonly prisma: PrismaService) { }

  async createCreditCardWithTransaction(
    userId: number,
    cardNumber: string,
    holderName: string,
    expirationDate: string,
    cvv: string,
  ): Promise<CreditCard> {
    let createdCreditCard: CreditCard | null = null;
    const PRICE_CARD = 50;

    try {
      await this.prisma.$transaction(async (prisma) => {
        this.logger.log(`Transaction started`);

        const userBalance = await prisma.userBalance.findUnique({
          where: { userId },
        });

        if (!userBalance || userBalance.amount < PRICE_CARD) {
          throw new Error('You don`t have money');
        }

        const updatedUserBalance = await prisma.userBalance.update({
          where: { userId },
          data: {
            amount: {
              decrement: PRICE_CARD,
            },
          },
        });

        const createdCard = await prisma.creditCard.create({
          data: {
            cvv,
            cardNumber,
            holderName,
            expirationDate,
            userId,
          },
        });

        createdCreditCard = createdCard;

        this.logger.log(`Transaction committed`);

        this.logger.log(`User ${userId} balance updated: ${updatedUserBalance.amount}`);
      });
    } catch (error) {
      this.logger.error('Error in createCreditCardWithTransaction:', error);

      throw error;
    }

    return createdCreditCard!;
  }
}