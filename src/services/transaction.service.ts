import { TransactionRepository } from '../repositories/transaction.repository';
import { User } from '@prisma/client';
import { io } from '../index';

const transactionRepository = new TransactionRepository();

export class TransactionService {
  
   async createTransaction(payload: { offerId: number; sellerId: number; buyerId: number; qtykwh:number; priceKwh:number; }) {
    const transaction = await transactionRepository.createTransactionWithOfferUpdate(payload);

    // Opcional: notificación por socket (si se desea notificar a vendedor/comprador)
    io.emit('transactionCreated', transaction);

    return transaction;
  }

  async getTransactions(user: User) {
    if (user.role === 'admin') {
      return transactionRepository.getAllTransactions();
    }

    if (user.role === 'buyer') {
      return transactionRepository.getTransactionsByBuyer(user.id);
    }

    if (user.role === 'seller') {
      return transactionRepository.getTransactionsBySeller(user.id);
    }

    throw new Error('Rol no autorizado para ver transacciones');
  }
}
