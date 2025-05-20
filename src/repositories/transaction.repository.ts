import { prisma } from '../prisma/client';
import { Transaction, Prisma } from '@prisma/client';

export class TransactionRepository {
  
   async createTransactionWithOfferUpdate(data: { offerId: number; sellerId: number; buyerId: number; qtykwh: number; priceKwh:number }) {
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
          qtykwh: offer.qtykwh,
          priceKwh: offer.priceKwh,
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
    return prisma.transaction.findMany({
      include: {
      buyer: {
        select: {
          full_name: true,
          surname: true,
        },
      },
      seller: {
        select: {
          full_name: true,
          surname: true,
        },
      },
    },
    });
  }

  async getTransactionsByBuyer(buyerId: number) {
    //return prisma.transaction.findMany({ where: { buyerId } });
    return prisma.transaction.findMany({
    where: { buyerId },
    include: {
      buyer: {
        select: {
          full_name: true,
          surname: true,
        },
      },
      seller: {
        select: {
          full_name: true,
          surname: true,
        },
      },
    },
  });
  }

  async getTransactionsBySeller(sellerId: number) {
    //return prisma.transaction.findMany({ where: { sellerId } });
    return prisma.transaction.findMany({
    where: { sellerId },
    include: {
      buyer: {
        select: {
          full_name: true,
          surname: true,
        },
      },
      seller: {
        select: {
          full_name: true,
          surname: true,
        },
      },
    },
  });
  }

  //TOTALES
  async getTotalPrice() {
    const result = await prisma.transaction.aggregate({
      _sum: {
        totalPrice: true,
      },
    });
    return result._sum.totalPrice || 0;
  }

  async getTotalKwh() {
    const result = await prisma.transaction.aggregate({
      _sum: {
        qtykwh: true,
      },
    });
    return result._sum.qtykwh || 0;
  }


}