const express = require('express');
const router = express.Router();
const Users = require("../model/Users.js");
const Information = require("../model/Information.js")


router.get('/register', (req, res) => {
    res.render('register');
});

router.post("/register", async (req, res, next) => {
    const data = {
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email,
        role: req.body.role
    }
    if(data.userName.length < 6) {
        next();
    }
    await Users.insertMany([data]);
    await Information.insertMany([data]);
    res.redirect("/login")
});
module.exports = router;
