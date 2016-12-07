var url = "http://localhost:800/BoardgameNight/php/";
var eventArray = [];
var userIds = [];
var users = [];

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
    if(getCookie("user") == ""){
        window.location.href = "login.html";
    }
    getAllUserIds();
});

$(document).on("click", "#sendMail", function(){
    if($("input[name='mailingList']:checked").val() == "custom"){
        $.each($("#selectUsers :checked"), function(index, checkbox){
            userIds[index] = $(this).val();
        });
    }
    sendMail();
});

$(document).on("change", "input[name='mailingList']", function(event){
    $("#listOfUsers").empty();
    var buttonVal = $("input[name='mailingList']:checked").val();
    switch(buttonVal){
        case "all":
            getAllUserIds();
            $.each(users, function(index, user){
                userIds[index] = user.user_id;
            });
            break;
        case "custom":
            getAllUserIds();
            addUserSelection();
            break;
        case "event":
            getEventsByHost();
            break;
    }
});

$(document).on("change", "#selectEvent", function(event){
    var eventId = $("#selectEvent :selected").val();
    getPlayerIds(eventArray[eventId]);
});

function getEventsByHost(){
    $("#listOfUsers").html("<select id='selectUsers'></select>")
    $.get(url + "getUserEvents.php", function(data){
        eventArray = data.hostList;
        $.each(eventArray, function(index, event){
            $("#selectUsers").append("<option value='"+ index +"'>"+event.title+"</option>");
        });
    }, "json");
}

function addEventsToSelect(){
    var level = getCookie("level");
    if(level==1 || level==2){
        $("#mailingList").append("<option value='0' selected>All users</option>");
    }
}

function addUserSelection(){
    $("#listOfUsers").html('<form id="selectUsers"></form>');
    $.each(users, function(index, user){
        $("#selectUsers").append("<input type='checkbox' value='" + user.user_id + "'/>" + user.username);
    });
    $("#listOfUsers").append('<br><input type="checkbox" id="saveCustomList" value="save"/>Save custom list?');
}

function getAllUserIds(){
    $.ajax({
        type: "GET",
        url: url + "getUser.php",
        dataType: "json",
        success: function(data){
            $.each(data, function(index, user){
                users[index] = user;
            });
        }
    });
}

function getPlayerIds(eventId){
    $.ajax({
        type: "GET",
        url: url + "getEvent.php",
        dataType: "json",
        data: {eventId: eventId},
        success: function(data){
            $.each(data, function(index, user){
                userIds[index] = user.user_id;
            });
        }
    });
}

function sendMail(){
    var subject = $("#subject").val();
    var body = $("#mailBody").val();
    $.post("../php/sendMail.php",{user_ids: userIds, subject: subject, body: body},function(data){
        window.location.href = "index.html";
    }, "json");
}