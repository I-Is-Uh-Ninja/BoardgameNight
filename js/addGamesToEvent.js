$(document).ready(function(){
    if(getCookie("user") == ""){
        window.location.href = "login.html";
    }
    getGames();
    getGamesInList(getUrlParameter("eventId"));
});

function getGames(){
    $.get("../php/getGames.php", function(data){
        addGamesToTable(data);
    }, "json");
}

function getGamesInList(eventId){
    $.get("../php/getGamesList.php", {eventId: eventId}, function(data){
        disableOptions(data);
    }, "json");
}

function addGamesToTable(games){
    $("#gameslist").empty();
    $.each(games, function(index, game){
        $("#gameslist").append("<tr id='"+ game.game_id +"'></tr>");
        $("#gameslist tr#" + game.game_id).append("<td><input type='checkbox' value='" + game.game_id + "'></td>");
        $("#gameslist tr#" + game.game_id).append("<td><h3>" + game.title + "</h3><p>"+ game.description + "</p></td>");
        $("#gameslist tr#" + game.game_id).append("<td><img src='"+ game.image + "' alt='"+ game.title +"' width='250' height='250'></td>");
    });
}

function disableOptions(gamesInList){
    $.each(gamesInList, function(index, game){
        $("tr#" + game.game_id + " :checkbox").attr("disabled", "disabled");
    });
}

$(document).on("click", "#addGamesListBtn", function(){
    var eventId = getUrlParameter("eventId");
    $.each($("#gameslist :checked"), function(index, checkbox){
        addGameToList($(this).val(), eventId);
    });
    if($("#error").val() == ""){
        window.location.href = "gamelist.html?eventId=" + eventId;
    }
});

function addGameToList(gameId, eventId){
    $.post("../php/addGameToList.php", {gameId: gameId, eventId: eventId}, function(data){
        if(!data.success){
            $("#error").text(data.errors);
        }
    }, "json");
}