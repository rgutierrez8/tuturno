const express = require("express");
const dataBase = require("./db");
const router = express.Router();


//ENDPOINTS USADOS PARA FUNCIONES DE CONTROL EN BUSQUEDA POR HORA Y USUARIO EXISTENTE
router.get("/validateRegister", (req, res) => {
    const user = req.query.userName;
    const email = req.query.email;
    const stadium = req.query.name;

    if(user){
        dataBase.searchUser(user,
            err=> {
                res.render("errors", {
                    layout: "error",
                    docTitle: "Ocurrió un error"
                })
            },
            data => {
                res.send(data)});
                return;
    }
    if(email){
        dataBase.searchByEmail(email, 
            err => {
                res.render("errors", {
                    layout: "error",
                    docTitle: "Ocurrió un error"
                })
            },
            data => res.send(data));
            return;
    }

    if(stadium){
        dataBase.searchStadium(stadium,
            err=> {
                res.render("errors", {
                    layout: "error",
                    docTitle: "Ocurrió un error"
                })
            },
            data => {
                res.send(data)});
                return;
    }
});

router.get("/validateHour", (req, res) => {
    const id = req.query.id;
    const collection = "stadiums";

    dataBase.searchById(collection, id,
        err => {
            res.render("errors", {
                layout: "error",
                docTitle: "Ocurrió un error"
            })
        }, 
        dataStadium => res.json(dataStadium));
});

module.exports = router;