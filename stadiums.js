const express = require("express");
const dataBase = require("./db");
const dataBaseMod = require("./dbModifier");               
const fs = require("fs");
const multer = require("multer");
const upload = multer({dest: "client/img/canchas"});
const util = require("./utils");

const path = require("path");
const router = express.Router();

router.use(express.static(path.join(__dirname, "client")));
router.use(express.urlencoded({extended: true}));

                        // REGISTRO DE CANCHAS
router.get("/stadiumRegister", (req, res) => {
    res.render("stadiumRegister", {
        docTitle: "Registra tu cancha",
        otherCSS: "stadiumRegister.css",
        script: "stadiumRegister.js"
    })
});

router.post("/uploadStadium", upload.array("stadiumImages"), (req, res) => {
    
    fs.mkdir(`client/img/canchas/${req.body.localName}`, {recursive:true},
    err => console.log(""));
    for(let i=0; i<req.files.length; i++){
        fs.renameSync(req.files[i].path, `client/img/canchas/${req.body.localName}/cancha${i+1}.jpg`);
    }

    const stadium = {
        owner: req.body.ownerName,
        name: req.body.localName,
        address: req.body.address,
        phone: req.body.phone,
        price: parseInt(req.body.price),
        nightPrice: parseInt(req.body.nightPrice),
        floor: req.body.floor,
        available: ["14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "00"],
        taken: [],
        stage: {one: "cancha1.jpg", two: "cancha2.jpg", three: "cancha3.jpg"},
        logo: "",
        readyToList: false
    }
    
    dataBaseMod.registerStadium(stadium,
        err => {
            res.render("errors", {
                layout: "error",
                docTitle: "Ocurrió un error"
            })
        },
        result => res.render("stadiumRegister", {
            otherCSS: "stadiumRegister.css",
            register: true,
            script: "stadiumRegister.js"
        }));
});

router.get("/rentHour", (req, res) => {
    let hour = req.query.hour;
    let id = req.query.id;
    let available;
    let taken;

    dataBase.searchById("stadiums", id,
        err => {
            res.render("errors", {
                layout: "error",
                docTitle: "Ocurrió un error"
            })
        },
        dataHour => {
            available = util.updateData(dataHour[0].available, `${hour}`);
            taken = dataHour[0].taken;
            taken.push(hour);
            dataBaseMod.updateOne("stadiums", id, available, taken,
            err => console.log("Error de update"),
            result => res.status(200).send());
        });
    
    
});

module.exports = router; 