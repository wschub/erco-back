import { UserRepository } from '../repositories/user.repository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userRepository = new UserRepository();

export class AuthService {
  async register(full_name: string, surname: string, email: string, password: string, role = 'buyer') {
    const existing = await userRepository.findByEmail(email);
    if (existing) throw new Error('Email already in use');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userRepository.create({ full_name, surname, email, password: hashedPassword, role });
    return this.generateToken({
    id: user.id,
    full_name: user.full_name,
    surname: user.surname,
    email: user.email,
    role: user.role,
  });
  }
  
   async getUsers() {
    const users = await userRepository.findAll();
    return users;
  }


  async login(email: string, password: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new Error('User not found');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Invalid password');

    return this.generateToken({
    id: user.id,
    full_name: user.full_name,
    surname: user.surname,
    email: user.email,
    role: user.role,
  });
  }

  private generateToken(user: {
  id: number;
  full_name: string;
  surname: string;
  email: string;
  role: string;
}) {
  const payload = {
    id: user.id,
    full_name: user.full_name,
    surname: user.surname,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: '1d',
  });
}
  /*
  private generateToken(userId: number): string {
    return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  }
    */
}
