const express = require("express");
const dataBase = require("./db");
const dataBaseMod = require("./dbModifier");
const path = require("path");
const router = express.Router();

router.use(express.static(path.join(__dirname, "client")));
router.use(express.urlencoded({extended: true}));

let address = "/";

                        // LOGIN DE USUARIOS
router.post("/logIn", (req, res) => {  
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
        err => { 
            res.render("login", {
                docTitle: "Ingresar",
                pAlert: "",
                otherCSS: "login.css",
                layout: "error"
            });
            return;
        },
        userData => {
            if(userData.length === 0){
                res.render("login", {
                    docTitle: "Ingresar",
                    pAlert: "",
                    otherCSS: "login.css",
                    layout: "error",
                    pAlert: "El usuario no existe"
                });
                return;
            }

            if(userData[0].password === pass){
                req.session.name = userData[0].name;
                req.session.email = userData[0].email;
                req.session.username = userData[0].username;
                req.session.password = userData[0].password;
                req.session.userPic = userData[0].userPic;
                req.session.loged = true;
                res.redirect(address);
                return;
            }
            res.render("login", {
                docTitle: "Ingresar",
                pAlert: "",
                otherCSS: "login.css",
                layout: "error",
                pAlert: "La contraseña no es correcta"
            });
            return;
        });
});

                        // LOGOUT DE USUARIOS
router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

                        // REGISTRO DE USUARIOS
router.post("/signUp", (req, res) => {
    const user = {
        name: `${req.body.name} ${req.body.lastName}`,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        loged: false,
        admin: false
    }
    dataBaseMod.registerUser(user,
        err => {
            res.render("errors", {
                layout: "error",
                docTitle: "Ocurrió un error"
            })
        },
        result => res.redirect("/"));
});

                        // PERFIL DE USUARIO
router.get("/profile", (req, res) => {
    
    address = "/user/profile";

    if(!req.session.username){
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


module.exports = router;