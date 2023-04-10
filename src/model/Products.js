const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    // id : {
    //     type: String,
    // },
    category : {
        type : String
    },
    name: {
        type: String
    },
    price: {
        type: String
    },
    image : {
        data :Buffer,
        contentType:String
    },
    desc: {
        type: String
    },
    nguoiDang : {
        type: String
    }
    
});

const Products = mongoose.model("products" , usersSchema);

module.exports = Products;