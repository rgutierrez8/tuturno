const express = require("express");
const dataBase = require("./db");
const path = require("path");
const router = express.Router();

router.use(express.static(path.join(__dirname, "client")));

let address = "/";

                        // LISTA DE TURNOS DISPONIBLES
router.get("/searchTurn", (req, res) => {

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
    address= `/turn/searchTurn?stadium=${name}&hour=${hourUrl}`;

    dataBase.searchByName(collection, stadiumName,
        err => {
            res.render("", {
                layout: "error",
                descriptionError
            });
            res.redirect("/turn/searchTurn");
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
                res.redirect("/turn/searchTurn");
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
router.get("/selectTurn", (req, res) => {
    let name = req.query.name;
    let index = req.query.index;
    
    address = `/turn/selectTurn?name=${name}&index=${index}`;

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
        dataBase.searchStadiumByIdAndName(name, index,
            err => {
                res.render("errors", {
                    layout: "error",
                    docTitle: "Ocurrió un error"
                })
            },
            data => {
                res.render("stadium", {
                    cookies: req.session,
                    data,
                    otherCSS: "stadium.css",
                    script: "stadium.js",
                })
            })
    }
});

module.exports = router;