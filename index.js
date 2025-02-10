const express = require("express");
const sqlite3 = require("sqlite3");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan")

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const dbpapth = path.resolve(__dirname, "../blog.db");
const db = new sqlite3.Database(dbpath);

app.get("/", (req, res) => {
    res.json("welcome to the blog API - SQL version...")
});

app.get("/posts", (req, res) => {
    db.all("SELECT * FROM POSTS", (err, rows) => {
        if (err) {
            res.status(500).json({  error: err.message  })
        }
        console.log("data fetched", rows);
        res.json(rows);
    })
});

const PORT = 5020
app.listen(PORT, () => {
    console.log(`server is running on http:localhost:${PORT}`);
})