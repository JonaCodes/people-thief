var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({ 
    name: String,
    picture: String,
    origin: {type: String, default: undefined},
    stolenFrom: {type: String, default: undefined},
    stolenBy: {type: String, default: undefined}
});

var UserModel = mongoose.model("UserModel", userSchema);

module.exports = UserModel