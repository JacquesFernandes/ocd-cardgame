var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    username: String,
    progress: Number
});

module.exports.userSchema = userSchema;