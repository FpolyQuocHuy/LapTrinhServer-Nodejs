const express = require('express');
const router = express.Router();
const Users = require("../model/Users");
const information = require("../model/Information");



router.get("/information", async (req, res, next) => {
    var user = req.session.user ? req.session.user.userName : "";
    var __id = req.session.user ? req.session.user.__id : "";
    const users = await Users.find({});

    users.map(users => {

        if (users.userName === user) {
            res.render("information", { style: "styles.css", users: users.toJSON(), user: user, _id: __id });
        }
    });
});
router.post("/saveInfor", async (req, res) => {

    var _user = req.body.userName;
    const infor = await information.find({});
    var _id; 
    infor.map(infor => {
        infor.toJSON();
        if (infor.userName == _user) {
            _id = infor.id;
        }
    })
    try {
        await information.findOneAndUpdate({ _id: _id }, req.body , { new: true });
        console.log("sửa thông tin thành công");
        res.redirect("/");
    } catch (err) {
        res.send("lỗi : " + err)
    }
})

module.exports = router;