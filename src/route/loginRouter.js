const express = require('express');
const router = express.Router();
const Users = require("../model/Users");
const session = require('express-session');
const sha1 = require('sha1');
const cookieParser = require('cookie-parser');
require('../../middle/auth.js');
const passport = require('passport');
const sendMail = require('../../middle/sendMail.js');
require('dotenv').config();

router.use(cookieParser());
router.use(passport.initialize());
router.use(passport.session());

router.use(session({
   secret: 'login',
   resave: false,
   saveUninitialized: true
 }));
 router.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
 

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
          req.session.user = {
            userName: user.userName,
            __id: user.id,
            role: user.role
          };
          
            const email = user.email; 
            console.log("email " , email);
        const otp = Math.floor(100000 + Math.random() * 900000); 
        req.session.otp = otp; 
        console.log("------------ " +otp +" ------------- " );
        setTimeout(() => {
          delete req.session.otp;
          console.log("OTP đã bị xóa.");
        }, 120000);
        try {
          //  sendMail({ email, otp });
          // res.redirect('/otp');
          res.redirect('/home');
        }catch(err) {
          console.log("Lỗi : " , err);
        }
         
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

// ---------------------------------------------------------

router.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));

router.post('/verify-otp', (req, res) => {
  const submittedOTP = req.body.otp;
  const expectedOTP = req.session.otp;
  if (submittedOTP == expectedOTP) {
    console.log("Đăng nhập thành công");
    console.log(req.body.user);
    res.redirect('/home');
   
  }else {
    req.session.errorMessage = 'OTP Không chính xác. Mời bạn nhập lại.';
    return res.redirect('/otp');
  }
  
});
router.get('/otp', (req, res) => {
  const errorMessage = req.session.errorMessage;
  res.render('otp', { errorMessage });
});

router.get( '/auth/google/callback',
passport.authenticate('google', { failureRedirect: '/login' }),
(req, res) => {
  req.session.user = req.user;
  res.redirect('/home');
}
);

module.exports = router;
