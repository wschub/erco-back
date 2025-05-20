import { OfferRepository } from '../repositories/offer.repository';
import { io } from '../index';

const offerRepository = new OfferRepository();

export class OfferService {


  async createOffer(data: any,user: any) {
    if (user.role !== 'seller') throw new Error('No autorizado');

    const newOffer = await offerRepository.createOffer({
      ...data,
     sellerId: user.id  
    });

    const refreshAllOffers = await  offerRepository.findAll();
    console.log(refreshAllOffers);

    io.emit('new-offer', refreshAllOffers); // socket broadcast aquí
    return newOffer;
  }


  async updateOffer(id: number, data: any, user: any) {
    const offer = await offerRepository.findById(id);
    if (!offer) throw new Error('Oferta no encontrada');

    if (user.role !== 'admin' && offer.sellerId !== user.id)
      throw new Error('No autorizado');

    return await offerRepository.update(id, data);
  }

  async deleteOffer(id: number, user: any) {
    const offer = await offerRepository.findById(id);
    if (!offer) throw new Error('Oferta no encontrada');

    if (user.role !== 'admin' && offer.sellerId !== user.id)
      throw new Error('No autorizado');

    return await offerRepository.delete(id);
  }

  async getOffers(user: any) {
    if (user.role === 'admin') {
      return await offerRepository.findAll();
    } else if (user.role === 'seller') {
      return await offerRepository.findBySeller(user.id);
    } else if (user.role === 'buyer') {
      return await offerRepository.findActive();
    } else {
      throw new Error('Rol no reconocido');
    }
  }

  async getOfferById(id: number) {
    return await offerRepository.findById(id);
  }

  //count
  async getCountOffers(status: string) {
    return await offerRepository.getCountOffers(status);
  }
}
