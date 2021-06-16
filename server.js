const express = require("express");
const expHbs = require("express-handlebars");
const expSession = require("express-session");
const dataBase = require("./db");
const path = require("path");
const app = express();
const port = 3000;

const stadiums = require("./stadiums.json");
const users = require("./users.json");
const { Db } = require("mongodb");

let address = "/";

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
        cookies: req.session
    });
});

                        // LISTA DE TURNOS DISPONIBLES
app.get("/searchTurn", (req, res) => {

    let name = "";
    let hourUrl = "";

    if(req.query.name){
        name = req.query.name;
    }
    if(req.query.hour){
        hourUrl = req.query.hour;
    }
    let description = "Resultados para tu búsqueda:";
    let descriptionError = "Ocurrió un error inesperado, redireccionando ...";
    const stadiumName = req.query.stadium;
    const hour = req.query.hour;
    const collection = "stadiums";
    address= `/searchTurn?stadium=${name}&hour=${hourUrl}`;

    dataBase.searchByName(collection, stadiumName,
        err => {
            res.render("", {
                layout: "error",
                descriptionError
            });
            res.redirect("/searchTurn");
            return;
        },
        stadiumData =>{
            res.render("list", {
                cookies: req.session,
                description,
                turn: stadiumData,
                docTitle: `Turnos disponibles`,
                otherCSS: "listHandlebars.css",
                layout: "secondMain"
            });
            return;
        });

    if(hour){
        dataBase.searchByHour(hour, 
            err => {
                res.render("", {
                    layout: "error",
                    descriptionError
                });
                res.redirect("/searchTurn");
                return;
            }, 
            data => {
                res.render("list", {
                    description,
                    turn: data,
                    docTitle: "Turnos disponibles",
                    otherCSS: "listHandlebars.css",
                    layout: "secondMain"
                })
                return;
            });
    }
    
    if(stadiumName && hour){
        dataBase.searchByNameAndHour(stadiumName, hour,
            err => {
                res.render("list", {
                    description,
                    turn: stadiumData,
                    docTitle: `Turnos disponibles`,
                    otherCSS: "listHandlebars.css",
                    layout: "secondMain"
                });
                return;
            },
            data => {
                res.render("list", {
                    description,
                    turn: data,
                    docTitle: `Turnos disponibles`,
                    otherCSS: "listHandlebars.css",
                    layout: "secondMain"
                });
                return;
            })
    }
});

                        // CANCHA SELECCIONADA Y HORARIOS DISPONIBLES/NO DISPONIBLES
app.get("/selectTurn", (req, res) => {
    let name = "";
    let index = "";

    if(req.query.name){
        name = req.query.name;
    }
    if(req.query.index){
        index = req.query.index;
    }
    let local;
    let hour;
    address = `/selectTurn?name=${name}&index=${index}`;

    if(!req.session.username){
        res.render("login", {
            title: "Ingresar",
            otherCSS: "login.css", 
            pAlert: "",
            layout: "error",
        });
        return;
    }

    if(req.query.name){
        local = stadiums.filter(local => local.name.includes(req.query.name));
        hour = Object.keys(local[0].available);
    }

    res.render("stadium", {
        cookies: req.session,
        local,
        otherCSS: "stadium.css",
        script: "stadium.js",
        hour,
    });
});

                        // PERFIL DE USUARIO
app.get("/profile", (req, res) => {
    
    address = "/profile";

    if(!req.session.username){
        console.log(req.session);
        res.render("login", {
            layout: "error",
            otherCSS: "login.css"
        })
        return;
    }

    res.render("profile", {
        cookies: req.session,
        otherCSS: "profile.css",
        description: "Tu Perfil",
    });
});

                        // REGISTRO DE USUARIOS
app.get("/signUp", (req, res) => {
    
});

                        // LOGIN DE USUARIOS
app.post("/logIn", (req, res) => {  

    const user = req.body.user;
    const pass = req.body.password;

    if(!user || !pass){
        res.render("login", {
            docTitle: "Ingresar",
            pAlert: "",
            otherCSS: "login.css",
            layout: "error"
        });
        return;
    }

    dataBase.searchUser(user, 
        pass,
        err => { 
            res.redirect("login.html")
        },
        userData => {
            if(userData.length === 0){
                res.render("login", {
                    docTitle: "Ingresar",
                    pAlert: "",
                    otherCSS: "login.css",
                    layout: "error"
                });
                return;
            }
            req.session.name = userData[0].name;
            req.session.email = userData[0].email;
            req.session.username = userData[0].username;
            req.session.password = userData[0].password;
            req.session.loged = true;
            res.redirect(address);
        });
});

                        // LOGOUT DE USUARIOS
app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

app.get("/contact", (req, res) => {
    res.render("contact", {
        description: "Formulario de contacto",
        docTitle: "Contactanos",
        otherCSS: "contact.css",
        script: "contact.js"
    });
});



//ENDPOINTS USADOS PARA FUNCIONES DE CONTROL EN BUSQUEDA POR HORA Y USUARIO EXISTENTE
app.get("/validate", (req, res) => {
    let valid = users.filter(user => user.name.includes(req.query.name));
    res.send(valid);
});

app.get("/validateHour", (req, res) => {
    const id = parseInt(req.query.id) + 1;
    const collection = "stadiums";

    dataBase.searchById(collection, id,
        err => {
            console.log("Ocurrió un error.");
        }, 
        dataStadium => res.json(dataStadium));
});

app.listen(port, (req, res) => {{
    console.log(`Server running, PORT: ${port}`);
}});