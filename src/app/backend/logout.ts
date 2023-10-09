import { Request, Response } from 'express';


export const handleLogout = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/logout', {
      method: 'POST',
    });

    if (response.status === 200) {
      window.location.href = '/login';
    } else {
      console.error('Logout failed');
    }
  } catch (error) {
    console.error('Logout error:', error);
  }
};

export function logout(_req: Request, res: Response) {

const clearAuthToken = (res: Response) => {
        res.clearCookie('token', { httpOnly: true });
}

  try {
    clearAuthToken(res);
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Unable to logout', error);
    res.status(500).json('Internal server error');
  }
}
