import pkg from "pg";
const { Client } = pkg;

const client = new Client({
    user: "andriivlasiuk",
    host: "localhost",
    database: "lokkeroom",
    password: 1234,
    port: 5432,
});
client.connect();

export default client;
