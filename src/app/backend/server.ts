import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import express from 'express'
import cookieParser from 'cookie-parser';


const app = express();

const port = process.env.PORT || 8000

const router = express.Router();

const users = [
    {
        id: 1,
        username: 'j',
        password: 'a',
    }
]

app.use(cookieParser())

router.post('/', (req, res) => {
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

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, 'secret-key', { expiresIn: '1h' });

    // Return the token to the client
    res.status(200).json({ token });
  });
})

app.get('/', (req, res) => {
    res.send("s")
})

app.get('/login', (req, res) => {
    
})

app.get('/register', (req, res) => {

})

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})

