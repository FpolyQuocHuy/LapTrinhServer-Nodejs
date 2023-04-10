const express = require('express');
const router = express.Router();
const Products = require("../model/Products");

router.get("/products/detail:id" , async(req , res) => {
    let _id = req.params.id;
    const id = _id.replace(":" ,"");
    const products = await Products.find({});
    var datas = products.map(product => {
      
        if(product._id == id) {
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

    res.render("detailProduct" , {data : data});
})
module.exports = router;