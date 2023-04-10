const express = require('express');
const router = express.Router();
const Users = require("../model/Users");
const session = require('express-session');


router.use(session({
   secret: 'login',
   resave: false,
   saveUninitialized: true
 }));
router.get('/login', (req, res) => {
  
    res.render('login' );
});

router.post("/login" , async(req , res) => {
    try{  
       const user = await Users.findOne({userName:req.body.userName});
       console.log("ĐĂng nhập thành công  :" + user.password + " name : " + user.userName);
       if(!user) {
        return res.status(500).json("Không tìm thấy người dùng");
       }
       if(user.password == req.body.password) {
         req.session.user = {
            userName: user.userName ,
            __id : user.id,
          };

          await user.save();
          res.redirect("/home" );
       }else {
          return res.status(500).json("Sai tài khoản hoặc mật khẩu");
          
       }
    }catch (err) {
      return res.status(500).json("Lỗi " + err );
    } 
  });
module.exports = router;
