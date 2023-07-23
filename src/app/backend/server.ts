import express from 'express';
import cookieParser from 'cookie-parser';
import { register } from './register.js';
import { logout, login } from './login.js';

const app = express();
const port = 8080;

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

app.use(express.json());
app.use(cookieParser());

app.post('/register', register);
app.post('/login', login);
app.post('/logout', logout);
