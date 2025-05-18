import { prisma } from '../prisma/client';
import { Offer, Prisma } from '@prisma/client';

export class OfferRepository {
  
async createOffer(data: any) {
  return await prisma.offer.create({ data });
}


  async update(id: number, data: Prisma.OfferUpdateInput) {
    return await prisma.offer.update({ where: { id }, data });
  }

  async delete(id: number) {
    return await prisma.offer.delete({ where: { id } });
  }

  async findById(id: number) {
    return await prisma.offer.findUnique({ where: { id } });
  }

  async findAll() {
    return await prisma.offer.findMany({ include: { seller: true } });
  }

  async findBySeller(sellerId: number) {
    return await prisma.offer.findMany({
      where: { sellerId },
      include: { seller: true },
    });
  }

  async findActive() {
    return await prisma.offer.findMany({
      where: { status: 'active' },
      include: { seller: true },
    });
  }
}
