import { Client } from 'pg'

const client = new Client({
    password: "root",
    user: "root",
    host: "postgres",
});
