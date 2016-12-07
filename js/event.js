var url = "http://localhost:800/BoardgameNight/php/";
var eventId = 0;

function selectEvent(id){
    clearEvent();
    eventId = id;
    getEvent();
}

$(document).on("click", "#deleteEvent", function(event){
    deleteEvent();
});

function deleteEvent(){
    $.post(url + "deleteEvent.php", {event_id: eventId}, function(data){
        if(data.success){
            window.location.reload();
        }
    }, "json");
}

function getEvent(){
    $.ajax({
        type: "GET",
        url: url + "getEvent.php",
        data: {
            eventId: eventId
        },
        dataType: "json",
        success: function(data){
            addEventData(data);
        },
        error: function(){
            alert("Couldn't get events!");
        }
    });
}

function clearEventInfo(){
    $("#eventInfo").text("");
}

function clearEvent(){
    $("#event").html('<h2 id="eventTitle"></h2><h3 id="eventDate"></h3><p id="eventInfo"></p><form id="dinnerForm"><h4>Eating dinner?</h4>'
    + '<input type="radio" name="dinner" value="1" checked/>Yes<br><input type="radio" name="dinner" value="0"/>No<br><input type="submit" id="signup" value="Sign up"/>'
    + '</form><p id="error"></p><table id="playerTable"><thead><tr><th>Name</th><th>Eating dinner?</th></tr></thead><tbody></tbody></table>');
}

function addEventData(data){
    var eventInfo = data[0];
    $("#eventTitle").text(eventInfo.title);
    $("#eventDate").text(eventInfo.date);
    clearEventInfo();
    $("#eventInfo").append("Host: " + eventInfo.username + "<br>");
    if(eventInfo.place === null){
        $("#eventInfo").append("Place: " + eventInfo.street + " " + eventInfo.number + ", " + eventInfo.name + "<br>");
    }
    else{
        $("#eventInfo").append("Place: " + eventInfo.place + "<br>");
    }
    $("#eventInfo").append("Notes: " + eventInfo.notes + "<br>");
    
    $("#eventInfo").append("Deadline for signing up: " + eventInfo.deadline);
    if(eventInfo.host_id == getCookie("user")){
        $("#eventTitle").before("<a href='sendMail.html' id='sendMail'>Send mail to players</a>");
        $("#sendMail").after("<a id='editEvent' href='addEvent.html?eventId=" + eventId + "'>Edit event</a>");
        $("#editEvent").after("<input type='button' id='deleteEvent' value='Delete event'/>");
    }
    
    var eventPlayers = data[1];
    $.each(eventPlayers, function(index, player){
        var dinner = player.dinner == 1 ? "Yes" : "No";
        $("#playerTable tbody").append("<tr id='"+player.user_id+"'><td>" + player.username + "</td><td>" + dinner + "</td></tr>");
    });
    var eventParts = eventInfo.deadline.split(" ");
    var eventDeadline = eventParts[0] + "T" + eventParts[1];
    if(isUserInEvent(eventPlayers) || eventInfo.host_id == getCookie("user")){
        $("input#signup").attr("disabled", "disabled");
        $("input#signup").after("<br>You are already signed up for this event!<br>");
        $("#playerTable tr#" + getCookie("user")).append("<td><input type='button' id='signout' value='Sign out'/></td>");
    }
    else if(new Date(eventDeadline) < new Date()){
        $("input#signup").attr("disabled", "disabled");
        $("input#signup").after("<br>Deadline for signing up is over!<br>");
    }
}

function updatePlayerList(){/*
    $("#playerTable tbody").empty();
    $.each(playerList, function(index, player){
        var dinner = player.dinner == 1 ? "Yes" : "No";
        $("#playerTable tbody").append("<tr><td>" + player.username + "</td><td>" + dinner + "</td></tr>");
    });
    if(isUserInEvent(playerList)){
        $("input#signup").attr("disabled", "disabled");
        $("input#signup").after("<br>You are already signed up for this event!<br>");
        $("#playerTable tr#" + getCookie("user")).append("<td><input type='button' id='signout' value='Sign out'/></td>");
    }*/
    clearEvent();
    getEvent();
}

function isUserInEvent(players){
    var userId = getCookie("user");
    var result = false;
    $.each(players, function(i, player){
        if(player.user_id == userId){
            result = true;
        }
    });
    return result;
}

$(document).on("click","#signup",function(event){
    event.preventDefault();
    signUp();
});

function signUp(){
    var dinner = $("input[name='dinner']:checked").val();
    var toSend = {
        event_id: eventId,
        dinner: dinner
    };
    $.post("../php/signup.php", toSend , function (data) {
        response = JSON.parse(data);
        if(response['success']){
            updatePlayerList();
        }else{
            $("#error").text("Error: " + response["error"]);
        }
    });
}

$(document).on("click", "#signout", function(event){
    signOut();
});

function signOut(){
    $.post("../php/removePlayerFromList.php", {event_id: eventId}, function(data){
        updatePlayerList();
    });
}

