var express = require("express");
var router = express.Router();
var schemas = require("../Schemas");
var mongoose = require("mongoose");

router.get("/",function(req,res)
{
    res.status(200).send("You've reached the api");
    return;
});

router.post("/login",function(req,res)
{
    var data = req.body;
    
    var response = {};

    var username = data.username.trim();
    if (username == "")
    {
        response.status = "error";
        response.message = "Nice try, please enter a username properly...";
        res.send(JSON.stringify(response));
        return;
    }
    else
    {
        var user_schema = schemas.userSchema;
        var UserModel = mongoose.model("users", user_schema);

        UserModel.findOne({username:username},function(error, user)
        {
            if (user == null) // user doesn't exist
            {
                var new_user = new UserModel({username:username, progress:0});
                new_user.save(function(error)
                {
                    if(error)
                    {
                        console.log(error);
                    }
                });
                response.status = "success";
                response.message = "New user "+username+" added...";
                res.status(200).send(JSON.stringify(response));
                return;
            }
            else // user exists
            {
                response.status = "success";
                response.message = "Welcome back "+username+"...";
                res.status(200).send(JSON.stringify(response));
                return;  
            }
        });
    }
});

module.exports = router;

/* Support Methods */
function checkUsername(name)
{
    var user_schema = schemas.userSchema;
    var user_model = mongoose.model("users", user_schema);
    user_model.findOne({username:name},function(error, user)
    {
        if (user == null)
        {
            return(false);
        }
        else
        {
            return(true);    
        }
    });
}