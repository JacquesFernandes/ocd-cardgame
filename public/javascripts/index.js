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
            res = JSON.parse(res);
            if (res.status == "error")
            {
                alert(res.message);
                return;
            }
            else
            {
                alert(res.message);
                sessionStorage.setItem("username",uname);
                document.location = "game.html";
                return;
            }
        });
    }
}