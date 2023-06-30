const express = require('express');
const router = express.Router();
const Users = require("../model/Users");
const session = require('express-session');
const constant = require('../config/constant');
const jwt = require('jsonwebtoken');
const sha1 = require('sha1');


router.use(session({
   secret: 'login',
   resave: false,
   saveUninitialized: true
 }));
router.get('/login', (req, res) => {
  
    res.render('login' );
});

router.post("/login" , async(req , res) => {
  const username = req.body.userName;
  let userPwd = req.body.password;
  userPwd = sha1(userPwd);
    try{  
      const user = await Users.findOne({userName:username});
      if(user) { 
        if(user.password === userPwd) {
          const token = jwt.sign({ __id: user.id, userName: user.userName },constant.jwtSecret,
            { expiresIn: constant.jwtSecretExp });
            console.log("Đăng nhập thành công  " , token + " name : " + user.userName);
            req.headers["authorization"] = `Bearer ${token}`;
            req.session.user = {
              userName: user.userName ,
              __id : user.id,
            };
            res.redirect("/home" );
        }else {
        return res.status(500).json("Sai tài khoản mật khẩu");

        }
       }else {
        return res.status(500).json("Không tìm thấy người dùng");
       }
      }catch (err) {
        return res.status(500).json("Lỗi " + err );
      }     
  });
module.exports = router;
