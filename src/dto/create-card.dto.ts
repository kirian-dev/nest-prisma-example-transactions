export interface CreateCreditCardDto {
  cardNumber: string;
  holderName: string;
  expirationDate: string;
  cvv: string;
  userId: number;
}
