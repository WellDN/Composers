import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { pool } from './database.js';

export async function register(req: Request, res: Response) {
  const { username, password } = req.body;

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  const query =
      'INSERT INTO users (username, password) VALUES ($1, $2)';
  const values = [username, hashedPassword];

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error('Error registering user', err);
      res.status(500).send('Error registering user');
    } else {
      console.log('User registered successfully');
      res.status(200).send('User registered successfully');
    }
  });
}
