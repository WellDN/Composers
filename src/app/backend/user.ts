import 'dotenv/config';
import { hashPassword } from './utils/utils.js';
import { pool } from './database.js';
import bcrypt from 'bcrypt'

type User = {
    id: number;
    username: string;
    password: string;
}

export async function createUser(username: string, password: string): Promise<User> {
// maybe here
  try {
    const hashedPassword = await hashPassword(password);

    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
      [username, hashedPassword]
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

export async function getUserByUsername(username: string): Promise<User | null> {
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0] as User;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user');
  }
}

export async function deleteUserByUsername(username: string): Promise<void> {
    try {
        await pool.query('DELETE FROM users WHERE username = $1', [username]);
    } catch(error) {
        console.error('Error deleting user:', error);
        throw new Error('Failed to delete user');
    }
}

export async function verifyLogin(username: User["username"], password: User["password"]) { //change username to email later on
    try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
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
