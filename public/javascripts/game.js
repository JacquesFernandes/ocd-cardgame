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