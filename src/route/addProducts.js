const express = require('express');
const router = express.Router();
const Products = require("../model/Products");
const upload = require("../../middle/uploadFile.js");
const fs = require("fs");
const path = require('path');


router.get("/product/addProducts:id", async (req, res) => {
    let str = req.params.id;
    let IDStr = str.replace(':', '');
    const products = await Products.find({});
    var product;
    products.map(products => {
        if (products._id == IDStr) {
            product = products.toJSON();
        }
    });
    res.render("addProducts", { _id: IDStr, data: product });

});

async function addProducts(req, res, { data }) {
    try {
        await Products.insertMany(data);
        res.redirect("/listProducts");
    } catch (err) {
        res.status(500).send(err);
    }

};

async function updateProducts(req, res, { data }) {
    var user = req.session.user ? req.session.user.userName : "";

    try {
        if (user) {
            await Products.findOneAndUpdate({ _id: req.body.id }, data, { new: true });
            res.redirect("/listProducts");
        } else {
            return res.status(500).json("Bạn không thể sửa sản phẩm");
        }
    } catch (err) {
        res.send("lỗi : " + err)
    }

}
router.post("/product/addProducts", upload.single("image"), (req, res, next) => {

    var user = req.session.user ? req.session.user.userName : "";
    const fileName = req.file.filename;
    const data = {
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        image: {
            data: fs.readFileSync(path.join(__dirname, '../../uploads/' + req.file.filename)),
            contentType: "image/png",
        },
        desc: req.body.desc,
        nguoiDang: user,
    };
    try {
        if (user) {

            if (req.body.id == "") {
                addProducts(req, res, { data });
            } else {
                updateProducts(req, res, { data });
            }
        } else {
            return res.status(500).json("Chưa đăng nhập không thể đăng sản phẩm");
        }
    } catch (error) {
        return res.status(500).json("Lỗi Đăng sản phẩm : " + error);
    }
});


module.exports = router;