import { Request, Response } from 'express';
import { createUser, getUserByEmail } from './user.js';
import 'dotenv/config';

export async function register(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.status(409).send('Email already taken'); 
        }

        const newUser = await createUser(email, password);

        return res.status(201).json(newUser);
    } catch (error) {
        console.error('Error during registration: ', error);
        return res.status(500).send('Internal server error');
    }
}
