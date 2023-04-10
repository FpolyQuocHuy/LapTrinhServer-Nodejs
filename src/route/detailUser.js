const express = require('express');
const router = express.Router();
const information = require("../model/Information");

router.get("/user/detail:id" , async(req , res) => {
    var user = req.session.user ? req.session.user.userName : "";
    const users = await information.find({});
    const IDStr = req.params.id;
    let _id = IDStr.replace(':', '');
    let isAdmin = false;
    var __user ;
    users.map(_user => {
        if(_user.id == _id) {
            __user = _user;
        }
        if(user == _user.userName && _user.role == "admin") {
            isAdmin = true;
        }

    });

    if(isAdmin) {
        res.render("detailUser" , {__user : __user.toJSON() , user: user ,  style: "styles.css"});
    }else {
        res.status(500).json("chỉ admin mới có thể xem chi tiết người dùng");
    }
    
});

module.exports = router;