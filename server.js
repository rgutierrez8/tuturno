const express = require("express");
const { ExpressHandlebars } = require("express-handlebars");
const expHbs = require("express-handlebars");
const app = express();
const path = require("path");
const port = 3000;

const stadiums = require("./stadiums.json");
const users = require("./users.json");

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

app.get("/selectTurn", (req, res) => {

    const local = stadiums.filter(local => local.name.includes(req.query.name));
    const hour = Object.keys(local[0].available);

    res.render("stadium", {
        local,
        otherCSS: "stadium.css",
        script: "stadium.js",
        hour,
    });
});

app.get("/signUp", (req, res) => {
    
});

app.get("/validate", (req, res) => {
    let valid = users.filter(user => user.name.includes(req.query.name));
    res.send(valid);
});

app.get("/validateHour", (req, res) => {
    const id = parseInt(req.query.id) + 1;
    let valid = stadiums.filter(valid => valid.id === id);
    res.send(valid);
});

app.listen(port, (req, res) => {{
    console.log(`Server running, PORT: ${port}`);
}});