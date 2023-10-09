import express from 'express';
import cookieParser from 'cookie-parser';
import { register } from './register.js';
import { login } from './login.js';
import cors from 'cors'
import { logout } from './logout.js';


const app = express();
const port = 8080;


app.use(express.json());
app.use(cookieParser());

app.use(cors())

app.post('/register', register);
app.post('/login', login);
app.post('/api/logout', logout);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
