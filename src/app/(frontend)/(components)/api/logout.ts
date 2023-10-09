import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    res.setHeader('Set-Cookie', 'token=; Max-Age=0; HttpOnly');
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Unable to logout', error);
    res.status(500).json('Internal server error');
  }
}
