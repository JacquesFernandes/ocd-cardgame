var mongoose = require("mongoose");

var userSchema = mongoose.Schema({ // Note: stacks are meant to be JSON.parse'd when being used
    username: String,
    progress: Boolean, // true if started, false if not
    spade_stack: String, 
    heart_stack: String,
    club_stack: String,
    diamond_stack: String,
    main_stack: String
});

module.exports.userSchema = userSchema;