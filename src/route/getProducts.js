const express = require('express');
const router = express.Router();
const Products = require("../model/Products");
const information = require("../model/Information");



router.get("/listProducts", async (req, res, next) => {
    var user = req.session.user ? req.session.user.userName : "";

    const users = await information.find({});
    var datas = users;
    var isAdmin = false;
    datas.map(users => {
        if (users.userName == user && users.role == "admin") {
            isAdmin = true;
        }
    });
    try {
        const products = await Products.find({});
   

        const datas = products.map(products => {
            if (products.nguoiDang == user) {
                return {
                    ...products.toJSON(),
                    image: {
                        data: products.image.data.toString('base64'),
                        contentType: products.image.contentType
                    },
                };
            }
            if (isAdmin) {
                return {
                    ...products.toJSON(),
                    image: {
                        data: products.image.data.toString('base64'),
                        contentType: products.image.contentType
                    },
                };
            }

        }
        );
        const data = datas.filter(item => item);
        var countProduct = data.length;  

        res.render("listProducts", { style: "styles.css", data: data, user: user ,countProduct: countProduct });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error Occurred');
    }
});

router.post('/search', async (req, res) => {
    const query = req.body.query;
    const data = await Products.find({ name: { $regex: query, $options: 'i' } });

    console.log("Tìm kiếm thành cong : " + data);
    res.render('listProducts', { data: data.map(data => data.toJSON()), query: query });
    if (query.length == 0) {
        res.redirect('/listProducts');
    }
});

router.post("/product/delete", async (req, res, next) => {

    var id = req.body.id;
        await Products.findByIdAndDelete(id).then(result => {
            res.redirect('/listProducts');
        }).
            catch(err => {
                console.log("Lỗi Delete : " + err);
            });
    });


module.exports = router;