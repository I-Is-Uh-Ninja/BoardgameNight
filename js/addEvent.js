var url = "http://localhost:800/BoardgameNight/php/";
var eventId = 0;

$(document).ready(function(){
    getTownsByUser();
    eventId = getUrlParameter("eventId");
    if(eventId != undefined && eventId > 0){
        $("#addEventBtn").val("Edit event");
        getEvent();
    }
});

$(document).on("click", "#addEventBtn", function(){
    if($("#addEventForm").valid()){
        if($("#placeSelect :selected").val() > 0 || $("#placeText").val().length > 0){
            var post;
            if(eventId != undefined && eventId > 0){
                post = updateEvent();
            }
            else {
                post = addEvent();
            }
            post.done(function(data){
                window.location.href="index.html";
            });
        }
        else{
            $("#error").text("Either select an existing place, or enter one of your own by text");
        }
    }
});

function getTownsByUser(){
    $.ajax({
        type: 'GET',
        url: url + "getUserTowns.php",
        dataType: "json",
        success: function(data){
            addTowns(data);
        },
        error: function(jqXHR, textStatus, errorThrown){
            //alert("Couldn't get towns: " + errorThrown);
        }
    });
}

function addTowns(data){
    $.each(data, function(i, obj){
        $("#placeSelect").append("<option value='" + obj.town_id + "'>" + obj.street + " " + obj.number + ", " + obj.name + "</option>");
    });
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

function addEventData(data){
    var eventInfo = data[0];
    var eventParts = eventInfo.date.split(" ");
    var eventDate = eventParts[0] + "T" + eventParts[1];
    eventParts = eventInfo.deadline.split(" ");
    var eventDeadline = eventParts[0] + "T" + eventParts[1];
    $("#title").val(eventInfo.title);
    $("#date").val(eventDate);
    $("#deadline").val(eventDeadline);
    $("#notes").val(eventInfo.notes);
    $("#placeText").val(eventInfo.place);
    var townId = eventInfo.town_id
    if(townId != 0){
        $("option[value='"+townId+"']").attr("selected", "selected");
    }
}

$("#addUserForm").validate({
    rules: {
        title:{
            required: true,
            maxlength: 45
        },
        place:{
            maxlength: 80
        },
        date:{
            required: true
        },
        deadline:{
            required: true
        },
        notes:{
            maxlength: 80
        }
    },
    messages: {
        title: {
            required: "Title is required",
            maxlength: jQuery.validator.format("Title cannot be more than {0} characters long"), //{0} is a callback to the maxlength value
        },
        place: {
            maxlength: jQuery.validator.format("Place data cannot be more than {0} characters long")
        },
        date: {
            required: "A date is required"
        },
        deadline: {
            required: "A deadline for signing up is required"
        },
        notes: {
            maxlength: jQuery.validator.format("Notes cannot be more than {0} characters long")
        }
    }
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

function formToJs(){
    return {
        title: $("input[name='title']").val(),
        place: $("#placeText").val(),
        date: $("input[name='date']").val(),
        deadline: $("input[name='deadline']").val(),
        notes: $("#notes").val(),
        town_id: $("#placeSelect :selected").val()
    };
}

function addEvent(){
    return $.post(url + "addEvent.php", formToJs(), "json");
}

function updateEvent(){
    var form = formToJs();
    form.event_id = eventId;
    return $.post(url + "updateEvent.php", form, "json");
}