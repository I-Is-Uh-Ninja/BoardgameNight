$(document).on("click", "#addGameBtn", function(){
    if($("#addGameForm").valid()){
        if(getUrlParameter("gameId") != 0){
            updateGame();
        }
        else {
            addGame();
        }
    }
});

$(document).ready(function(){
    if(getCookie("user") == ""){
        window.location.href = "login.html";
    }
    var gameId = getUrlParameter("gameId");
    if(gameId != null){
        $.get("../php/getGames.php", {gameId: gameId}, function(data){
            if(data[0].game_id == gameId){
                fillForm(data[0]);
            }
        }, "json");
    }
});

function fillForm(data){
    $("#title").val(data.title);
    $("#descr").text(data.description);
    $("#image").val(data.image);
    $("#link").val(data.link);
}

function formToJs(){
    return {
        title: $("#title").val(),
        description: $("#descr").val(),
        image: $("#image").val(),
        link: $("#link").val()
    };
}

function addGame(){
    $.post("../php/addGame.php", formToJs(), function(data){
        if(data.success){
            window.location.href = "gamelist.html";
        }
        else {
            $("#error").text("Error: " + data.errors);
        }
    }, "json");
}

function updateGame(){
    var formVal = formToJs();
    formVal.gameId = getUrlParameter("gameId");
    $.post("../php/updateGame.php", formVal, function(data){
        if(data.success){
            window.location.href = "gamelist.html";
        }
        else {
            $("#error").text("Error: " + data.errors);
        }
    }, "json");
}

$("#addGameForm").validate({
    rules: {
        title: {
            required: true,
            minlength: 3,
            maxlength: 50
        },
        description: {
            maxlength: 80
        },
        image: {
            maxlength: 80
        },
        link: {
            maxlength: 80
        }
    },
    messages: {
        title: {
            required: "You have to fill in a title",
            minlength: jQuery.validator.format("The title must be at least {0} characters long"),
            maxlength: jQuery.validator.format("The title cannot be longer than {0} characters")
        },
        description: {
            maxlength: jQuery.validator.format("The description cannot be longer than {0} characters")
        },
        image: {
            maxlength: jQuery.validator.format("The image link cannot be longer than {0} characters")
        },
        link: {
            maxlength: jQuery.validator.format("The link cannot be longer than {0} characters")
        }
    }
});

