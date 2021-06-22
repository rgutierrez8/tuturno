const express = require("express");
const dataBase = require("./db");
const path = require("path");
const urlMongo = "mongodb://localhost:27017";

const router = express.Router();

router.use(express.static(path.join(__dirname, "client")));

router.get("/", (req, res) => {
    dataBase.searchSortedComments(
        err => {
            res.render("errors", {
                layout: "error",
                docTitle: "Ocurrió un error"
            })
        },
        data => {
            res.render("index", {
                title: "Tu Turno",
                cookies: req.session,
                data
            })
        }
    )
});

module.exports = router;
