var userId = 0;
var levelId = 0;
var url = "http://localhost:800/BoardgameNight/php/";

$(document).ready(function(){
    userId = getCookie("user");
    getUserData();
    $("#editUserBtn").click(function(event){
        if($("#editUserForm").valid()){
            updateUser();
        }
    });
});

function getUserData(){
    $.get(url + "getUser.php", {userId: userId}, function(data){
        $("#username").val(data.username);
        $("#password").val(data.password);
        $("#email").val(data.email);
        $("#diet").text(data.diet);
        $("#car").val(data.car);
        levelId = data.level_id;
    }, "json");
}

function updateUser(){
    $.ajax({
        url: "../php/updateUser.php",
        type: "POST",
        data: formToJs(),
        dataType: "json",
        success: function(data){
            window.location.reload();
            $("#success").text("Successfully updated!");
        },
        error: function(something, status, errorThrown){
            $("#error").text("Couldn't update data: " + errorThrown + "\nStatus: " + status);
        }
    });
}

function formToJs(){
    return {
        user_id: userId,
        username: $("#username").val(),
        password: $("#password").val(),
        email: $("#email").val(),
        diet: $("#diet").text(),
        car: $("#car").val(),
        level_id: levelId
    };
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

$("#editUserForm").validate({
    rules: {
        username: {
            required: true,
            maxlength: 25
        },
        email: {
            required: true,
            maxlength: 80,
            email: true
        },
        password: {
            required: true,
            maxlength: 30,
            minlength: 6
        },
        diet: {
            maxlength: 80
        },
        car: {
            maxlength: 25
        }
    },
    messages: {
        username: {
            required: "Please fill in a name for yourself",
            maxlength: jQuery.validator.format("Name cannot be longer than {0} characters")
        },
        email: {
            required: "Please fill in an e-mail address",
            maxlength: jQuery.validator.format("E-mail address cannot be longer than {0} characters"),
            email: "Not a valid e-mail address"
        },
        password: {
            required: "Please fill in a password",
            maxlength: jQuery.validator.format("Password cannot be longer than {0} characters"),
            minlength: jQuery.validator.format("Password must be longer than {0} characters")
        },
        diet: {
            maxlength: jQuery.validator.format("Dietary information cannot be longer than {0} characters")
        },
        car: {
            maxlength: jQuery.validator.format("Car information cannot be longer than {0} characters")
        }
    }
});