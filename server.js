const express = require("express");
const { ExpressHandlebars } = require("express-handlebars");
const expHbs = require("express-handlebars");
const app = express();
const path = require("path");
const port = 3000;

const stadiums = require("./stadiums.json");

app.engine("handlebars", expHbs({
    defaultLayout: "main",
    layoutsDir: "views/layout",
}));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "client")));

app.get("/", (req, res) => {
    res.redirect(path.join(__dirname, "client/index.html"));
});

app.get("/searchTurn", (req, res) => {

    let turn = stadiums.filter(turn => Object.values(turn.available).includes("available"));

    if(req.query.stadium){
        turn = stadiums.filter(turn => turn.name.includes(req.query.stadium));
    }

    if(req.query.hour){
        turn = stadiums.filter(turn => turn.available[req.query.hour].includes("available"));
    }

    res.render("list", {
        turn,
        docTitle: `Turnos disponibles`,
        otherCSS: "listHandlebars.css",
        layout: "secondMain"
    });
});

app.listen(port, (req, res) => {{
    console.log(`Server running, PORT: ${port}`);
}});