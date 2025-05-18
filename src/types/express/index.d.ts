import { User } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: User; // ⬅️ Aquí extiendes el tipo Request para incluir "user"
    }
  }
}
