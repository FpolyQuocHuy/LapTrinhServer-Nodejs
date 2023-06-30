const Users = require("../model/Users");
const Jwt = require("../config/checkJWT.js");


exports.checkAuth = async (req) => {
  
    const currentLogin = Jwt.getCurrentLogin(req);
  console.log("currentLogin " ,currentLogin );
    if (currentLogin && currentLogin.userId) {
      const checkMember = await Users.findOne({_id: currentLogin.userId});
      console.log("checkMember", checkMember);
     
      if (checkMember) {
        return true;
      }
    }else {
        console.log("Không tìm thấy user đăng nhập");
    }
    
    return false;
};