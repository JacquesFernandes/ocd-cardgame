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
            if (user == null) // user doesn't exist, make one
            {
                new_user = makeNewUser(username);
                var new_user_model = new UserModel(new_user);
                new_user_model.save(function(error)
                {
                    if(error)
                    {
                        console.log(error);
                    }
                });
                response.status = "success";
                response.message = "New user "+username+" added...";
                response.user_data = JSON.stringify({
                    username: username,
                    progress: 0,
                    main_stack: new_user.main_stack,
                    spade_stack: new_user.spade_stack,
                    heart_stack: new_user.heart_stack,
                    club_stack: new_user.club_stack,
                    diamond_stack: new_user.diamond_stack
                });
                res.status(200).send(JSON.stringify(response));
                return;
            }
            else // user exists || TODO
            {
                response.status = "success";
                response.message = "Welcome back "+username+"...";
                response.heaps = fetchHeaps();
                res.status(200).send(JSON.stringify(response));
                return;  
            }
        });
    }
});

router.post("/fetchNewStack",function(req,res)
{
    response = {
        status: "success",
        message: "Generated new stack...",
        main_stack: generateMainStack()
    };

    res.status(200).send(JSON.stringify(response));
});

module.exports = router;

/* Support Methods */
function makeNewUser(username)
{
    data = {
        username:username, 
        progress:0,
        spade_stack: "",
        heart_stack: "",
        club_stack: "",
        diamond_stack: "",
        main_stack: generateMainStack()
    };
    console.log(data);
    return(data);
}

function generateMainStack()
{
    var spades = ["s1","s2","s3","s4","s5","s6","s7","s8","s9","s10","sK","sQ","sJ"];
    var hearts = ["h1","h2","h3","h4","h5","h6","h7","h8","h9","h10","hK","hQ","hJ"];
    var clubs = ["c1","c2","c3","c4","c5","c6","c7","c8","c9","c10","cK","cQ","cJ"];
    var diamonds = ["d1","d2","d3","d4","d5","d6","d7","d8","d9","d10","dK","dQ","dJ"];

    var main_stack = []; // total of 52

    while (spades.length > 0 || hearts.length > 0 || clubs.length > 0 || clubs.length > 0)
    {
        suit = Math.floor(Math.random() * 4) + 1;
        if (suit == 1 && spades.length > 0)
        {
            var index = Math.floor(Math.random()*spades.length)
            main_stack.push(spades.splice(index,1)[0]);
        }
        else if (suit == 2 && hearts.length > 0)
        {
            var index = Math.floor(Math.random()*hearts.length)
            main_stack.push(hearts.splice(index,1)[0]);
        }
        else if (suit == 3 && clubs.length > 0)
        {
            var index = Math.floor(Math.random()*clubs.length)
            main_stack.push(clubs.splice(index,1)[0]);
        }
        else if (suit == 4 && diamonds.length > 0)
        {
            var index = Math.floor(Math.random()*diamonds.length)
            main_stack.push(diamonds.splice(index,1)[0]);
        }
    }
    main_stack = JSON.stringify(main_stack);
    console.log(main_stack);
    return(main_stack);
}