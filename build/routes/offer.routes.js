"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const offer_controller_1 = require("../controllers/offer.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.get('/', auth_middleware_1.authMiddleware, offer_controller_1.list);
router.post('/', auth_middleware_1.authMiddleware, offer_controller_1.create); // Solo seller
router.post('/buy/:id', auth_middleware_1.authMiddleware, offer_controller_1.buy); // Solo buyer
exports.default = router;
