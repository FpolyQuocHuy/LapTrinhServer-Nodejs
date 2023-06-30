const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    
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
}, {
    collection:'products'   
} 
);

const Products = mongoose.model("products" , usersSchema);


// for(var i = 0; i < 20;i++) {
//      Products.create({
//         category:"Quần áo",
//         name: "Quần áo " + i,
//         price:"200000",
//         image:"",
//         desc:"mô tả số" + i ,
//         nguoiDang:"huyhuy123"
//     });
// }
module.exports = Products;