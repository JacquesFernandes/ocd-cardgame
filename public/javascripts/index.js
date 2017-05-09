function loginApp()
{
    var uname = $("#username")[0].value.trim();
    if (uname == "" || uname == null)
    {
        alert("Please Enter your username");
        return;
    }
    else
    {
        var send_data = {username:uname};
        $.post("/api/login/",send_data, function(res)
        {
            //console.log(res);
            res = JSON.parse(res);
            if (res.status == "error")
            {
                alert(res.message);
                return;
            }
            else
            {
                alert(res.message);
                console.log(res);
                var user_data = res.user_data;
                user_data = JSON.parse(user_data);
                console.log(user_data);
                sessionStorage.setItem("username", user_data.username);
                sessionStorage.setItem("main_stack", user_data.main_stack); // sessionStorage.main_stack -> String
                sessionStorage.setItem("spade_stack", user_data.spade_stack); // sessionStorage.spade_stack -> String
                sessionStorage.setItem("heart_stack", user_data.heart_stack); // sessionStorage.heart_stack -> String
                sessionStorage.setItem("club_stack", user_data.club_stack); // sessionStorage.club_stack -> String
                sessionStorage.setItem("diamond_stack", user_data.diamond_stack); // sessionStorage.diamond_stack -> String
                document.location = "game.html";
                return;
            }
        });
    }
}