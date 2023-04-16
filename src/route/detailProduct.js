const express = require('express');
const router = express.Router();
const Products = require("../model/Products");

router.get("/products/detail:id" , async(req , res) => {
    let _id = req.params.id;
    const id = _id.replace(":" ,"");
    const products = await Products.find({});
    var user =  req.session.user ? req.session.user.userName : "";
    var isCongNghe = false;
    var datas = products.map(product => {
      
        if(product._id == id) {
            if(product.category == "Công nghệ"){
                isCongNghe = true;
            }
            // console.log("Id : " + product._id + " - ID 2: " + id);
            return {
                ...product.toJSON(),
                image: {
                    data: product.image.data.toString('base64'),
                    contentType: product.image.contentType
                },
            };
        }
    });
    const data = datas.filter(item => item);

    res.render("detailProduct" , {data : data ,user :user ,isCongNghe : isCongNghe});
})
module.exports = router;