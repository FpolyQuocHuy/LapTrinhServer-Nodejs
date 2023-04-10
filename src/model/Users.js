const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: true,
        minlength : 6,
        maxlength: 20,
        unique: true,
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
    role : {
        type :String,
    }
});

const Users = mongoose.model("users", usersSchema);

module.exports = Users;