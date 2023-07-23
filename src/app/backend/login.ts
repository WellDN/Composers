import { Request, Response } from "express";
import { verifyLogin } from "./user.js";
import jwt from 'jsonwebtoken'

export async function login(req: Request, res: Response) {
    const { username, password } = req.body;
    try {
        const user = await verifyLogin(username, password);

        if (!user) {
         return res.status(401).send('Invalid username or password');
        }

        const secretKey = process.env.JWT_SECRET;

        if (!secretKey) {
            throw new Error('SECRET_KEY is not defined in the environment variables');
        }

        const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' })

        res.cookie('token', token, { httpOnly: true })

        res.status(200).send('Login successful');
    } catch (error) {
        console.error('Error during login: ', error);
        return res.status(500).send('Internal server error');
    }
}
export function logout(res: Response) {
    try {
        res.cookie('token', '', { expires: new Date(0), httpOnly: true });
        return res.status(200).send('Logged out sucessfully');
    } catch(error) {
        console.error('unable to logout', error);
    }
}
