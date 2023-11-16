const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    sender: {
        type: String,
        require: true,
        
    },
    receiver: {
        type: String,
        require: true,
    },
    content : {
        type: String,
        require :true,
    },
    createdAt: {
         type: Date, 
         default: Date.now },
    
});

const Message = mongoose.model("message", messageSchema);

module.exports = Message;