const express = require("express");
const expHbs = require("express-handlebars");
const expSession = require("express-session");
const path = require("path");
const app = express();
const port = 3000;

const stadiums = require("./stadiums.json");
const users = require("./users.json");

app.engine("handlebars", expHbs({
    defaultLayout: "main",
    layoutsDir: "views/layout",
}));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use(expSession({
    secret: "@/TuTurno2021-ProyectoFullStackWebDeveloper/@",
}));

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "client")));


//COMIENZO DE ENDPOINTS
app.get("/", (req, res) => {
    res.render("index", {
        title: "Tu Turno",
    });
});

app.get("/searchTurn", (req, res) => {
    let description;
    let turn = stadiums.filter(turn => Object.values(turn.available).includes("available"));

    if(req.query.stadium){
        turn = stadiums.filter(turn => turn.name.includes(req.query.stadium));
    }
    
    if(req.query.hour){
        turn = stadiums.filter(turn => turn.available[req.query.hour].includes("available"));
    }

    if(Object.entries(turn).length === 0){
        description = `No se encontraron turnos disponibles`;
    }
    else{
        description = `Turnos disponibles:`;
    }
  
    res.render("list", {
        description,
        turn,
        docTitle: `Turnos disponibles`,
        otherCSS: "listHandlebars.css",
        layout: "secondMain"
    });
});

app.get("/selectTurn", (req, res) => {
    let local;
    let hour;
    if(!req.session.username){
        res.redirect("/");
        return;
    }

    if(req.query.name){
        local = stadiums.filter(local => local.name.includes(req.query.name));
        hour = Object.keys(local[0].available);
    }
    console.log(req.session.username);
    res.render("stadium", {
        cookies: req.session,
        local,
        otherCSS: "stadium.css",
        script: "stadium.js",
        hour,
    });
});

app.get("/signUp", (req, res) => {
    
});

app.post("/logIn", (req, res) => {
    const user = getUser();
    if(user){
        req.session.username = user.username;
        req.session.loged = true;
        res.redirect("/selectTurn");
    }
});

app.get("/loged", (req, res) => {
    const user = getUser();
    if(user){
        req.session.username = user.username;
        req.session.loged = true
    }
    console.log("session");
    console.log(req.session);
});

function getUser(){
    return users.find(user => user.username == "winnions" && user.password == "holamundo");
}



//ENDPOINTS USADOS PARA FUNCIONES DE CONTROL EN BUSQUEDA POR HORA Y USUARIO EXISTENTE
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