"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buyOffer = exports.getActiveOffers = exports.createOffer = void 0;
const client_1 = require("@prisma/client");
const index_1 = require("../index");
const prisma = new client_1.PrismaClient();
const createOffer = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const offer = yield prisma.offer.create({ data });
    index_1.io.emit('new-offer', offer); // Enviar a todos en tiempo real
    return offer;
});
exports.createOffer = createOffer;
const getActiveOffers = () => __awaiter(void 0, void 0, void 0, function* () {
    const now = new Date();
    return prisma.offer.findMany({
        where: {
            isSold: false,
            availableFrom: { lte: now },
            availableTo: { gte: now }
        }
    });
});
exports.getActiveOffers = getActiveOffers;
const buyOffer = (offerId, buyerId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const offer = yield tx.offer.findUnique({ where: { id: offerId } });
        if (!offer || offer.isSold || new Date() > offer.availableTo) {
            throw new Error('Oferta no disponible');
        }
        const updated = yield tx.offer.update({
            where: { id: offerId },
            data: {
                isSold: true,
                buyerId,
                soldAt: new Date()
            }
        });
        index_1.io.emit('offer-sold', updated); // Notifica en tiempo real
        return updated;
    }));
});
exports.buyOffer = buyOffer;
