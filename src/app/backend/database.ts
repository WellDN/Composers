import pg from 'pg'
const { Client } = pg;


const connectDb = async () => {
    try {
        const client = new Client({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: 'postgres',
            password: process.env.PGPASSWORD,
            port: Number(process.env.PGPORT)
        })
 
        await client.connect()
        const res = await client.query('SELECT NOW()')
        console.log(res)
        await client.end()
    } catch (error) {
        console.log(error)
    }
}
 
connectDb()
