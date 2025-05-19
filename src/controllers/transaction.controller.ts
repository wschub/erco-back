import { Request, Response } from 'express';
import { TransactionService } from '../services/transaction.service';
import { User } from '@prisma/client';

const transactionService = new TransactionService();

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { offerId, sellerId, qtykwh,priceKwh } = req.body;
    const buyerId = req.user.id;

    const transaction = await transactionService.createTransaction({ offerId, sellerId, buyerId,qtykwh,priceKwh });

    res.status(201).json(transaction);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await transactionService.getTransactions(req.user);
    res.status(200).json(transactions);
  } catch (error: any) {
    res.status(403).json({ error: error.message });
  }
};

