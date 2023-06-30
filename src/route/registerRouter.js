const express = require('express');
const router = express.Router();
const Users = require("../model/Users.js");
const Information = require("../model/Information.js")
const sha1 = require('sha1');

router.get('/register', (req, res) => {
    res.render('register');
});

router.post("/register", async (req, res, next) => {
    userPwd = sha1(req.body.password);
    const data = {
        userName: req.body.userName,
        password: userPwd,
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
