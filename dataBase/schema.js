let mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

let UserSchema = new Schema({
    title: {type: String , require: true , unique: true},
    firstName: {type: String , require: true},
    lastName: {type: String , require: true}
});

exports.User = mongoose.model('User' , UserSchema);