var url = "http://localhost:800/BoardgameNight/php/";
var user = null;
var level = null;
var userEvents = [];

$(document).ready(function(){
    addMenu();
    getEvents();
});

function addMenu(){
    user = getCookie("user");
    if(user !== ""){
        level = getCookie("level");
        $("#menubar").empty();
        $("#menubar").append("<input type='button' id='logout' value='Logout'/>");
        $("#menubar").append("<a href='user.html'>Edit user data</a>");
        $("#menubar").append("<a href='addTown.html'>Add town</a>");
        getAllEventsForUser();
        if(level === "1" || level === "2"){
            $("#menubar").append("<a href='addEvent.html'>Add event</a>");
        }
        if(level === "1"){
            $("#menubar").append("<a href='addUser.html'>Add user</a>");
        }
    }
    else{
        user = null;
        $("#menubar").empty();
        $("#menubar").append("<a href='login.html'>Log in</a>");
    }
}

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

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getEvents(){
    $.ajax({
        type: 'GET',
        url: url + "agenda.php",
        dataType: "json",
        success: function(data){
            displayEvents(data);
        },
        error: function(jqXHR, textStatus, errorThrown){
        }
    });
}

function displayEvents(data){/*
    if(user === null){
        
    }
    else {
        $("#agendaHead tr").append("<th>Host</th><th>Place</th><th>Deadline sign-up</th><th>Notes</th>");
        $.each(data, function(i, obj){
            $("#agendaBody").append("<tr id='" + obj.event_id + "'>")
                    .append("<td>" + obj.title + "</td>")
                    .append("<td>" + obj.date + "</td>");
            $("#agendaBody").append("<td>" + obj.username + "</td>");
            if(obj.place == null){
                $("#agendaBody").append("<td>" + obj.street + " " + obj.number + ", " + obj.name + "</td>");
            }
            else{
                $("#agendaBody").append("<td>" + obj.place + "</td>");
            }
            $("#agendaBody").append("<td>" + obj.deadline + "</td><td>" + obj.notes + "</td>");
            $("#agendaBody").append("<td><a href='event.html?eventId=" + obj.event_id + "'>View</a></td>");
            
            $("#agendaBody").append("</tr>");
        });
    }*/
    if(user==null){
        $.each(data, function(i, obj){
            $("#agendaBody").append("<tr id='" + obj.event_id + "'><td>" + obj.title + "</td><td>" + obj.date + "</td></tr>");
        });
    }
    else{
        $.each(data, function(i, obj){
            $("#agendaBody").append("<tr id='" + obj.event_id + "' onclick='selectEvent("+obj.event_id+");'><td>" + obj.title + "</td><td>" + obj.date + "</td></tr>");
        });
    }
}

function getAllEventsForUser(){
    $.ajax({
        type: 'GET',
        url: url + "getUserEvents.php",
        dataType: "json",
        success: function(data){
            setEventsInArray(data);
        },
        error: function(jqXHR, textStatus, errorThrown){
        }
    });
};

function setEventsInArray(events){
    if(events.playerList != null){
        $.each(events.playerList, function(i, event){
            userEvents.push(event.event_id);
        });
    }
    if(events.hostList != null){
        $.each(events.hostList, function(i, event){
            userEvents.push(event.event_id);
        });
    }
}

$(document).on("click", "#logout", function(){
    setCookie("user", "", 1);
    setCookie("level", "", 1);
    window.location.reload();
});