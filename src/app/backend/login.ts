import { Request, Response } from "express";

import { verifyLogin } from "./user.js";
import jwt from 'jsonwebtoken'

export async function login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
        const user = await verifyLogin(email, password);

        if (!user) {
         return res.status(401).send('Invalid email or password');
        }

        const secretKey = process.env.JWT_SECRET;

        if (!secretKey) {
            throw new Error('SECRET_KEY is not defined in the environment variables');
        }

        const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' })

        res.cookie('token', token, { httpOnly: true })

        res.status(200).json({ user, token });
    } catch (error) {
        console.error('Error during login: ', error);
        return res.status(500).json('Internal server error');
    }
}
