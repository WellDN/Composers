import { Request, Response } from 'express';
import { createUser, getUserByUsername } from './user.js';
import { hashPassword } from './utils/utils.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export async function register(req: Request, res: Response) {
    const { username, password } = req.body;
    try {
        const existingUser = await getUserByUsername(username);

        if (!existingUser) {
            return res.status(409).send('Username already taken'); // make it to user not just username
        }

        const hashedPassword = await hashPassword(password);

        const newUser = await createUser(username, hashedPassword);

        return res.status(201).json(newUser);
    } catch (error) {
        console.error('Error during registration: ', error);
        return res.status(500).send('Internal server error');
    }
}
