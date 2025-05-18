"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const offer_socket_1 = require("./sockets/offer.socket");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const offer_routes_1 = __importDefault(require("./routes/offer.routes"));
const transaction_routes_1 = __importDefault(require("./routes/transaction.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
    },
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/auth', auth_routes_1.default);
app.use('/api/offers', offer_routes_1.default);
app.use('/api/transactions', transaction_routes_1.default);
// Setup sockets
(0, offer_socket_1.setupSocket)(io);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// Exporta IO para usarlo en controladores
//export { io, server };
