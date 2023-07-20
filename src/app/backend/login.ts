import { Request, Response } from "express";
import { pool } from "./database.js";
import { compareSync } from "bcrypt";

export function login(req: Request, res: Response) {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = $1';
  const values = [username];

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error('Error logging in', err);
      res.status(500).send('Error logging in');
    } else {
      if (result.rows.length === 0) {
        res.status(401).send('Invalid username or password');
      } else {
        const user = result.rows[0];

        const isPasswordValid = compareSync(password, user.password);

        if (!isPasswordValid) {
          res.status(401).send('Invalid username or password');
        } else {
          res.status(200).send('Login successful');
        }
      }
    }
  })
}
