import { prisma } from '../prisma/client';
import { Offer, Prisma } from '@prisma/client';
const now:any = new Date();

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
  const now = new Date();

  return await prisma.offer.findMany({
    where: {
      status: 'active',
      startTime: {
        lte: now,
      },
      endTime: {
        gte: now,
      },
    },
    include: {
      seller: true,
    },
  });
}

  async findBySeller(sellerId: number) {
  const now = new Date(); // Necesario para usar 'now'

  return await prisma.offer.findMany({
    where: {
      sellerId,
      startTime: {
        lte: now,
      },
      endTime: {
        gte: now,
      },
    },
    include: {
      seller: true,
    },
  });
}

  async findActive() {
    const now = new Date(); 
    return await prisma.offer.findMany({
      where: { status: 'active',
        startTime: {
        lte: now, // startTime <= now
      },
      endTime: {
        gte: now, // endTime >= now
      },
       },
      include: { seller: true },
    });
  }

  //TOTALES
async getCountOffers(status:string) {
  const now = new Date();

  return await prisma.offer.count({
    where: {
      status: status,
      startTime: {
        lte: now,
      },
      endTime: {
        gte: now,
      },
    },
  });
}


}
