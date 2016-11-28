var url = "http://localhost:800/BoardgameNight/php/";
var eventArray = [];

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

$(document).ready(function(){
    addEventsToSelect();
    getEventsByHost();
});

function getEventsByHost(){
    $.get(url + "getUserEvents.php", function(data){
        eventArray = data[1];
        $.each(data[1], function(index, event){
            $("#mailingList").append("<option value='"+ index +"'>"+event.title+"</option>");
        });
    }, "json");
}

function addEventsToSelect(){
    var level = getCookie("level");
    if(level==1 || level==2){
        $("#mailingList").append("<option value='-1' selected>All users</option>");
    }
}

function getAllUserIds(){
    var userIds = [];
    $.get(url + "getUser.php", function(data){
        $.each(data, function(index, user){
            userIds[index] = user.user_id;
        });
    },"json");
    return userIds;
}

function getPlayerIds(eventId){
    var playerIds = [];
    $.get(url + "getEvent.php", {eventId: eventId}, function(data){
        var playerList = data[1];
        $.each(playerList, function(index, user){
            playerIds[index] = user.user_id;
        });
    });
    return playerIds;
}

function sendMail(){
    var selectId = $("#mailingList :selected").val();
    var userIds = [];
    if(selectId < 0){
        userIds = getAllUserIds();
    }
    else{
        var eventId = eventArray[selectId].event_id;
    }
}