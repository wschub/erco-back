import { prisma } from '../prisma/client';
import { Transaction, Prisma } from '@prisma/client';

export class TransactionRepository {
  
   async createTransactionWithOfferUpdate(data: { offerId: number; sellerId: number; buyerId: number }) {
    return await prisma.$transaction(async (tx) => {
      const offer = await tx.offer.findUnique({
        where: { id: data.offerId },
      });

      if (!offer || offer.status === 'sold') {
        throw new Error('La oferta no existe o ya ha sido vendida.');
      }

      const totalPrice = offer.qtykwh * offer.priceKwh;

      const transaction = await tx.transaction.create({
        data: {
          offerId: data.offerId,
          sellerId: data.sellerId,
          buyerId: data.buyerId,
          totalPrice,
        },
      });

      await tx.offer.update({
        where: { id: data.offerId },
        data: { status: 'sold' },
      });

      return transaction;
    });
  }

  async getAllTransactions() {
    return prisma.transaction.findMany();
  }

  async getTransactionsByBuyer(buyerId: number) {
    return prisma.transaction.findMany({ where: { buyerId } });
  }

  async getTransactionsBySeller(sellerId: number) {
    return prisma.transaction.findMany({ where: { sellerId } });
  }
}