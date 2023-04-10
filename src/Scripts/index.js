const express = require("express");
var exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const fa = require('@fortawesome/fontawesome-free');
//model
const Products = require("../model/Products");
const Users = require("../model/Users");
//router
const loginRouter = require("../route/loginRouter.js");
const registerRoute = require("../route/registerRouter.js");
const listUserRoute = require("../route/listUser.js");
const listProductRoute = require("../route/getProducts.js");
const addProducts = require("../route/addProducts.js");
const information = require("../route/information");
const detailUser = require("../route/detailUser");
const detailProduct = require("../route/detailProduct")
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://huy343536:Hoangquochuy1@cluster0.rvoqynt.mongodb.net/dataProducts?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected to MongoDB");

});
app.engine('.hbs', exphbs.engine());
app.set('view engine', '.hbs');
app.set("views", "./src/views");
app.use(express.static('css'));
app.use(express.static('image'));

//data : thoong tin người dùng , thông tin tài khoản , danh mục sản phẩm , thông tin sản phẩm


app.use(flash());
app.use(session({
    secret: 'login',
    resave: false,
    saveUninitialized: true
  }));

app.get("/home", async(req, res , next) => {
    const products = await Products.find({});

    var data = products.map(products => {
        return {
            ...products.toJSON(),
            image: {
              data: products.image.data.toString('base64'),
              contentType: products.image.contentType
            }
          };
    }
    );
   
    var user =  req.session.user ? req.session.user.userName : "";
    if(data == null) {
        next();
    }
    res.render("home", { style: "styles.css", data: data , user : user
    });

});
app.get("/home1", async(req, res ) => {
    const products = await Products.find({});

    res.json(products);

});
app.use("/" , loginRouter);
app.use("/" , registerRoute);
app.use("/" , listUserRoute);
app.use("/" , listProductRoute);
app.use("/" , addProducts);
app.use("/" , information);
app.use("/" , detailUser);
app.use("/" , detailProduct);

// router.get("/products/addProducts:id" , addProducts); 
app.listen(5000, () => {
    console.log('server is runing : http://localhost:5000');

});

