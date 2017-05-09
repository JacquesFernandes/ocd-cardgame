var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    username: String,
    progress: Number, // "x"/52
    spade_stack: String,
    heart_stack: String,
    club_stack: String,
    diamond_stack: String,
    main_stack: String
});

module.exports.userSchema = userSchema;