const { Client } = require("pg");
require("dotenv").config();

//Anslut till databas
const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false,
    },

});

client.connect((err) => {
    if (err) {
        console.log("Fel vid anslutning: " + err)
    } else {
        console.log("Du är ansluten till databasen.")
    }
});

//Skapa tabell
client.query(`
    DROP TABLE IF EXISTS courses;
    CREATE TABLE courses(
        id SERIAL PRIMARY KEY,
        coursecode VARCHAR(10),
        coursename VARCHAR(64),
        courseurl TEXT,
        courseprogression CHAR(1)
    )
    `);