import { Request, Response } from 'express';
import { OfferService } from '../services/offer.service';
import { User } from '@prisma/client';
const offerService = new OfferService();


export const createOffer = async (req: Request, res: Response) => {
  try {
    const offer = await offerService.createOffer(req.body, req.user); // 👈 req.user viene del middleware authenticate
    res.status(201).json(offer);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};



export const updateOffer = async (req: Request, res: Response) => {
  try {
    const offer = await offerService.updateOffer(
      Number(req.params.id),
      req.body,
      req.user
    );
    res.json(offer);
  } catch (error:any) {
    res.status(403).json({ error: error.message });
  }
};

export const deleteOffer = async (req: Request, res: Response) => {
  try {
    await offerService.deleteOffer(Number(req.params.id), req.user);
    res.status(204).send();
  } catch (error:any) {
    res.status(403).json({ error: error.message });
  }
};

export const getOffers = async (req: Request, res: Response) => {
  try {
    const offers = await offerService.getOffers(req.user);
    res.json(offers);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

export const getOfferById = async (req: Request, res: Response) => {
  try {
    const offer = await offerService.getOfferById(Number(req.params.id));
    res.json(offer);
  } catch (error:any) {
    res.status(404).json({ error: error.message });
  }
};

