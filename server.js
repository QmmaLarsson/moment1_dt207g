const { Client } = require("pg");
const express = require("express");
require("dotenv").config();

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
//Aktivera formulärdata
app.use(express.urlencoded({ extended: true }));

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

//Routing
app.get("/", async (req, res) => {
    //Läs ut från databasen
    client.query("SELECT * FROM courses", (err, result) => {
        if (err) {
            console.log("Fel vid db-fråga.")
        } else {
            res.render("index", {
                courses: result.rows
            });
        }
    });
});

app.post("/", async (req, res) => {
    const coursecode = req.body.coursecode;
    const coursename = req.body.coursename;
    const courseurl = req.body.courseurl;
    const courseprogression = req.body.courseprogression;

    //SQL-fråga
    const result = await client.query("INSERT INTO courses(coursecode, coursename, courseurl, courseprogression)VALUES($1, $2, $3, $4)",
        [coursecode, coursename, courseurl, courseprogression]
    );

    res.redirect("/");
});

//Starta servern
app.listen(process.env.PORT, () => {
    console.log("Servern är startad på port: " + process.env.PORT);
});