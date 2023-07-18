import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import express, { NextFunction } from 'express'
import cookieParser from 'cookie-parser';
import { Request, Response } from 'express';

type JwtVerify = {
    decoded: JwtPayload
} | any // Fix this type later

const app = express();

const port = 8080;

const router = express.Router();

app.get('/', (req, res) => {
    res.send("s")
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})

app.use(cookieParser())

const users = [
    {
        id: 1,
        username: 'john',
        password: 'a',
    }
]


const routeLogin = () => {
    router.post('/', async (req, res) => {
        const { username, password } = req.body;

        const user = users.find((u) => u.username === username);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (!result) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            const token = jwt.sign({ userId: user.id }, 'secret-key', { expiresIn: '1h' });

            res.status(200).json({ token });
        });
    })
}

// middleware
function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Access Denined' });
    }

 jwt.verify(token, 'secret-key', (err, decoded: JwtVerify) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.userId = decoded.userId;
        next();
    });
}

const routeProfile = () => {
router.get('/', authenticateToken, (req, res) => {
  // Example profile data. Replace this with your actual user data storage mechanism.
  const profiles = [
    {
      userId: 1,
      name: 'John',
      email: 'john@example.com',
      password: 'a',
    },
  ];

  // Find the profile based on the user ID
  const profile = profiles.find((p) => p.userId === req.userId);

  if (!profile) {
    return res.status(404).json({ message: 'Profile not found' });
  }

  // Return the profile to the client
  res.status(200).json({ profile });
});
}

const routeLogout = () => {
    router.post('/', (req, res) => {
        res.status(200).json({ message: 'Logout sucessful' });
    });
}

const routeUsers = () => {
router.get('/', (req, res) => {
    const users = [
        {
            id: 1,
            username: 'john',
            password: 'a',
        },
    ];

res.status(200).json({ users });
});
}

router.use('/users', routeUsers);
router.use('/login', routeLogin);
router.use('/profile', routeProfile);
router.use('/logout', routeLogout);
