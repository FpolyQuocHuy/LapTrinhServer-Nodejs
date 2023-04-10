

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://huy343536:Hoangquochuy1@cluster0.rvoqynt.mongodb.net/dataProducts?retryWrites=true&w=majority', {   useUnifiedTopology: true,useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to MongoDB");
 
});
module.exports.db;
