$(document).ready(function(){
    if(getCookie("user") == ""){
        window.location.href = "login.html";
    }
    var eventId = getUrlParameter("eventId");
    if(eventId!=null){
        $("h1").text("Games playable during this event");
        getGamesByEvent(eventId);
    }
    else{
        if(getCookie("level") == 1){
            $("#gamelist-container").before("<a href='addGame.html'>Add a game to this list</a>");
        }
        getGames();
    }
});

$(document).on("click", ".viewLink", function(event){
    var gameId = event.target.id;
    var row = $("tr#" + gameId);
    if(row.has("iframe").length){
        $("tr#" + gameId + " iframe").remove();
        $(this).val("View embedded site");
    }
    else{
        var link = $("tr#" + gameId + " a").attr("href");
        $(this).after("<iframe class='embeddedSite' id='" + gameId + "' src='" + link + "' width='750' height='500'></iframe>");
        $(this).val("Hide embedded site");
    }
});

$(document).on("click", ".removeGame", function(event){
    var gameId = event.target.id;
    removeGameFromList(gameId, getUrlParameter("eventId"));
});

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)===' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

function getGames(){
    $.get("../php/getGames.php", function(data){
        if(data != null){
            addGamesAsList(data);
        }
    },"json");
}

function getHostId(eventId){
    $.get("../php/getEvent.php", {eventId: eventId}, function(data){
        if(data[0].host_id == getCookie("user")){
            addHostOptions(eventId);
        }
    }, "json");
};

function getGamesByEvent(eventId){
    $.get("../php/getGamesList.php", {eventId: eventId}, function(data){
        addGamesAsList(data);
    }, "json");
}

function removeGameFromList(gameId, eventId){
    $.post("../php/removeGameFromList.php", {gameId: gameId, eventId: eventId}, function(data){
        if(data.success){
            getGamesByEvent(eventId);
        }
        else{
            alert("Couldn't remove event!");
        }
    }, "json");
}

function addGamesAsList(games){
    $("#gamelist-container").empty();
    $.each(games, function(index, game){
        $("#gamelist-container").append("<tr id='" + game.game_id + "'></tr>");
        var row = $("tr#" + game.game_id);
        row.append("<td><img src='" + game.image + "' alt='" + game.title + "' width='300' height='300'></td>");
        row.append("<td class='game-details' height='300' width='750'><h2>" + game.title + "</h2></td>");
        if(game.description != null){
            $("tr#" + game.game_id + " td.game-details").append("<p>" + game.description + "</p>");
        }
        if(game.link != null){
            row.append("<td><input type='button' class='viewLink' id='"+ game.game_id + "' value='View embedded site'/>"
                    + "<br><a href='" + game.link + "' rel='external' target='_blank'>View site in new tab</a></td>");
        }
        
    });
    var eventId = getUrlParameter("eventId");
    if(eventId != null){
        getHostId(eventId);
    }
}

function addHostOptions(eventId){
    $("#gamelist-container").before("<a href='addGamesToEvent.html?eventId=" + eventId + "'>Add a game to this list</a>");
    $.each($("tr"), function(i, row){
        $(this).append("<td><input type='button' class='removeGame' id='" + row.id + "' value='Remove game from this list'/></td>");
    });
}