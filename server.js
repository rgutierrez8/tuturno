const express = require("express");
const expHbs = require("express-handlebars");
const expSession = require("express-session");
const dataBase = require("./db");                         //VISUALIZAR DOCUMENTOS DE LA BASE DE DATOS
const dataBaseMod = require("./dbModifier");              //MODIFICAR DOCUMENTOS EN LA BASE DE DATOS
const path = require("path");
const app = express();
const port = 3000;

const Index = require("./index");
const Turn = require("./turnos");
const User = require("./user");
const Stadium = require("./stadiums");
const validation = require("./validation");

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
/*app.get("/", (req, res) => {
    res.render("index", {
        title: "Tu Turno",
        cookies: req.session
    });
});*/
app.use("/", Index);
app.use("/turn", Turn);
app.use("/user", User);
app.use("/stadium", Stadium);
app.use("/validation", validation);

app.get("/contact", (req, res) => {
    res.render("contact", {
        description: "Formulario de contacto",
        docTitle: "Contactanos",
        otherCSS: "contact.css",
        script: "contact.js"
    });
});

app.get("/faq", (req, res) => {
    res.render("faq", {
        description: "Preguntas frecuentes:",
        otherCSS: "faq.css",
        script: "faq.js"
    })
});


app.listen(port, (req, res) => {{
    console.log(`Server running, PORT: ${port}`);
}});