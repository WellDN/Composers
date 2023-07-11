import express from 'express'

const app = express();

const port = process.env.PORT || 8000

app.get('/', (req, res) => {
    res.send("s")
})

app.listen(port, () => {
    console.log(`s http://localhost:${port}`);
})
