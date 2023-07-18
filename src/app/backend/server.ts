import express from 'express'
import cookieParser from 'cookie-parser';

const app = express();

const port = 8080;

app.get('/', (req, res) => {
    res.send("s")
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})

app.use(cookieParser())
