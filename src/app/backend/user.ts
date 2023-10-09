import 'dotenv/config';
import { hashPassword } from '../utils.js';
import { pool } from './database.js';
import bcrypt from 'bcrypt'

export type User = {
    id: number;
    email: string;
    password: string;
}

export async function createUser(email: string, password: string): Promise<User> {
  try {
    const hashedPassword = await hashPassword(password);

    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
      [email, hashedPassword]
    );

    return result.rows[0] as User;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
}

export async function getUserById(id: number): Promise<User | null> {
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0] as User;
  } catch (error) {
    console.error('Error fetching id user:', error);
    throw new Error('Failed to fetch id user');
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0] as User;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user');
  }
}

export async function deleteUserByEmail(email: string): Promise<void> {
    try {
        await pool.query('DELETE FROM users WHERE email = $1', [email]);
    } catch(error) {
        console.error('Error deleting user:', error);
        throw new Error('Failed to delete user');
    }
}

export async function verifyLogin(email: User["email"], password: User["password"]) {
    try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
        return null
    }

    const userWithPassword = await result.rows[0] as User
    if (!userWithPassword || !userWithPassword.password) {
        return null
    }

    const isValid = await bcrypt.compare(password, userWithPassword.password)
    if (!isValid) {
        return null
    }

    const { password: _password, ...userWithoutPassword } = userWithPassword
    return userWithoutPassword
    } catch (error) {
        console.error('Error verifying login: ', error)
        throw new Error('Failed to verify login')
    }
}
