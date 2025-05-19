import { Request, Response } from 'express';
//import { loginUser, registerUser } from '../services/auth.service';
import { AuthService } from '../services/auth.service';
const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
  const { full_name, surname, email, password, role } = req.body;
  try {
    const result = await authService.register(full_name, surname,email, password, role);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await authService.login(email, password);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};


export const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await authService.getUsers();
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
