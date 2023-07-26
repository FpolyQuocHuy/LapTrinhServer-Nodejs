const express = require('express');
const router = express.Router();
const information = require("../model/Information");
const NodeCache = require('node-cache');
const myCache = new NodeCache();
router.get("/user/detail:id" , async(req , res) => {
    var user = req.session.user ? req.session.user.userName : "";
    var role = req.session.user ? req.session.user.role : "";
    console.log("User : " , user);
    const IDStr = req.params.id;
    let _id = IDStr.replace(':', '');
    var __user ;
    const dataFromCache = myCache.get(_id);
    if(dataFromCache == undefined){
        const userDetail = await information.findOne({_id});
        myCache.set(_id , userDetail);
            __user = userDetail;
    }else {
        __user = dataFromCache;
      }

    if(role ==="admin") {
        res.render("detailUser" , {__user : __user.toJSON() , user: user ,  style: "styles.css"});
    }else {
        res.status(500).json("chỉ admin mới có thể xem chi tiết người dùng");
    }
    
});

module.exports = router;