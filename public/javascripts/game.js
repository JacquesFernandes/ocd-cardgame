function setMainStackTop()
{
    var main_stack = JSON.parse(sessionStorage.main_stack);
    console.log(main_stack);
    if (main_stack.length > 0)
    {
        var card_data = main_stack.pop();
        var suit = card_data[0];
        var value = card_data.substr(1);
        if (suit == "s")
        {
            suit = "Spades";
        }
        else if (suit == "h")
        {
            suit = "Hearts";
        }
        else if (suit == "c")
        {
            suit = "Clubs";
        }
        else if (suit == "d")
        {
            suit = "Diamonds";
        }

        $("#card_suit")[0].innerText = suit;
        $("#card_value")[0].innerText = value;
        sessionStorage.main_stack = JSON.stringify(main_stack);
    }
    else
    {
        alert("Game Over!");
        var choice = confirm("Game Over! Restart?");
        if (choice == true)
        {
            data = {
                username: sessionStorage.username
            };

            $.post("/api/fetchNewStack", data, function(data) // returns a fresh stack
            {
                data = JSON.parse(data);
                if (data.status == "error")
                {
                    alert(data.message);
                }
                sessionStorage.main_stack = data.main_stack;
                //console.log("GOT: "+sessionStorage.main_stack);
                $("#Spades_stack")[0].innerHTML = "Spades: ";
                $("#Hearts_stack")[0].innerHTML = "Hearts: ";
                $("#Clubs_stack")[0].innerHTML = "Clubs: ";
                $("#Diamonds_stack")[0].innerHTML = "Diamonds: ";
                setMainStackTop();
            });
        }
    }

    return;
}

function popMainStack()
{
    var main_stack = JSON.parse(sessionStorage.main_stack);
    main_stack.pop();
    setMainStackTop(main_stack);
}

function checkCard(suit)
{
    var main_stack = JSON.parse(sessionStorage.main_stack);
    
    {
        if (suit == "Spades" || suit == "Hearts" || suit == "Clubs" || suit == "Diamonds")
        {
            var top_suit = $("#card_suit")[0].innerText.trim();
            if (top_suit == suit)
            {
                $("#"+suit+"_stack")[0].innerHTML += $("#card_value")[0].innerText.trim()+" ";
                setMainStackTop();
                return;
            }
            else
            {
                alert("nope, wrong suit");
                return;
            }
        }
        else
        {
            alert("nice try...");
            return;
        }
    }
}

function logout()
{
    var main_stack = sessionStorage.main_stack;
    var spade_stack = "";
    var heart_stack = "";
    var club_stack = "";
    var diamond_stack = "";
    var data = "";

    // Spades
    data = $("#Spades_stack")[0].innerHTML.trim();
    numbers = data.split(" ").splice(1);
    spade_stack = numbers.join(" ").trim();

    // Hearts
    data = $("#Hearts_stack")[0].innerHTML.trim();
    numbers = data.split(" ").splice(1);
    heart_stack = numbers.join(" ").trim();

    // Clubs
    data = $("#Clubs_stack")[0].innerHTML.trim();
    numbers = data.split(" ").splice(1);
    club_stack = numbers.join(" ").trim();

    // Diamonds
    data = $("#Diamonds_stack")[0].innerHTML.trim();
    numbers = data.split(" ").splice(1);
    diamond_stack = numbers.join(" ").trim();

    data = {
        username: sessionStorage.username,
        progress: true,
        spade_stack: spade_stack, 
        heart_stack: heart_stack,
        club_stack: club_stack,
        diamond_stack: diamond_stack,
        main_stack: main_stack
    }

    $.post("/api/saveGame",data, function(res)
    {
        console.log(res);
        //res = JSON.parse(res);

        if (res.status == "error")
        {
            alert(res.message);
        }
        else
        {
            document.location = "/";
            //sessionStorage = null; // "reset" the session
        }
    });
}

function loadStacks()
{
    var spade_stack = sessionStorage.spade_stack;
    var heart_stack = sessionStorage.heart_stack;
    var club_stack = sessionStorage.club_stack;
    var diamond_stack = sessionStorage.diamond_stack;

    $("#Spades_stack")[0].innerHTML = "Spades: "+spade_stack.trim();
    $("#Hearts_stack")[0].innerHTML = "Hearts: "+heart_stack.trim();
    $("#Clubs_stack")[0].innerHTML = "Clubs: "+club_stack.trim();
    $("#Diamonds_stack")[0].innerHTML = "Diamonds: "+diamond_stack.trim(); 
    return;
}