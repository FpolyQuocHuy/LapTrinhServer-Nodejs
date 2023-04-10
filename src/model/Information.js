const mongoose = require("mongoose");

const InformationSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: true,
        minlength : 6,
        maxlength: 20,
        
    },
    email: {
        type: String,
        require: true,
        minlength : 10,
        maxlength: 50,
        unique: true,
    },
    password : {
        type: String,
        require :true,
        minlength : 6
    },
    address : {
        type: String,
        require :true,
        minlength : 6
    },
    numberPhone : {
        type: String,
        require :true,
        minlength : 10
    },
    
    role : {
        type :String,
    }
});

const Information = mongoose.model("information", InformationSchema);

module.exports = Information;