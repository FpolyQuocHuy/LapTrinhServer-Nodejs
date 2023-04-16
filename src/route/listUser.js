const express = require('express');
const router = express.Router();
const Users = require("../model/Users");
const information = require("../model/Information");
const session = require('express-session');

router.get("/listUser", async (req, res, next) => {
    var user = req.session.user ? req.session.user.userName : "";

    const users = await information.find({});
    var data = users;
    var isAdmin = false;
    var countUser = data.length;
    console.log("Số lượng nguowiuf dùng : " + countUser);
    data.map(users => {
        if(users.userName == user && users.role == "admin"){
            isAdmin = true;
        } 
    });
    console.log("Is admin : " + isAdmin);
  
    res.render("listUser", { style: "styles.css", data: data.map(data => data.toJSON()), user: user 
    , isAdmin : isAdmin ,countUser : countUser });
});
router.get("/listUser11", async (req, res, next) => {
    

    const users = await information.find({});
    res.json(users);
});

router.post("/delete", async (req, res, next) => {
    var user = req.session.user ? req.session.user.userName : "";
    if (!user) {
        return res.status(500).json("Bạn chưa đăng nhập");
    }
    let id = req.body.id;
    const _users = await Users.find({});
    const users = await information.find({});
    var data = users;
    let userName ;
    let _idDeleteUser ;
    users.map(user => {
        if(id == user.id) {
            userName = user.userName;
        }
    });
    _users.map(_user => {
        if(_user.userName == userName) {
            _idDeleteUser = _user.id;
        }
    })
    try {
        await Users.findByIdAndDelete(_idDeleteUser);
        await information.findByIdAndDelete(id).then(result => {
            res.redirect('/listUser');

        }).then(() => {
            res.render("listUser", { style: "styles.css", data: data.map(data => data.toJSON()) });
        }).catch(err => {
            console.log("Lỗi Delete : " + err);
        });
    } catch (error) {
        return res.status(500).json("Bạn không phải Admin nên k thể xóa user");
    }

});
module.exports = router;