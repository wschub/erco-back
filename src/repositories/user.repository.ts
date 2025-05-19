import { prisma } from '../prisma/client';
import { User } from '@prisma/client';

export class UserRepository {
  async findAll(): Promise<User[]> {
    return prisma.user.findMany({orderBy: {full_name: 'asc',},});
  }
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  async findById(id: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async create(data: { full_name: string; surname: string; email: string; password: string; role?: string }): Promise<User> {
    return prisma.user.create({ data });
  }
}
