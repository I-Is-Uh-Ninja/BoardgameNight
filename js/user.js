var userId = 0;
var levelId = 0;
var url = "http://localhost:800/BoardgameNight/php/";
var savedPassword = "";

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

$(document).ready(function(){
    var tempUser = getCookie("user");
    var userLevel = 0;
    if(tempUser != ""){
        userLevel = getCookie("level");
        var urlUserId = getUrlParameter("userId");
        if(userLevel == 1 && urlUserId != null){
            userId = urlUserId;
            $("#username").attr("disabled", "true");
            $("#editPassword").attr("disabled", "true");
            $("#email").attr("disabled", "true");
            $("#diet").attr("disabled", "true");
            $("#car").attr("disabled", "true");
        }
        else{
            userId = tempUser;
        }
    }
    if(userLevel == 1){
        $("#levelRow").html('<td>Level:</td><td><select id="level" name="level" required size="3"><option value="1">Admin</option>'
                +'<option value="2">Host</option><option value="3">Player</option></select></td>');
    }
    getUserData();
    $("#editUserBtn").click(function(event){
        if($("#editUserForm").valid()){
            updateUser();
        }
    });
    $("#editPassword").change(function(){
        if(this.checked){
            $("#password").val("");
            $("#passwordRow").removeAttr("hidden");
        }
        else{
            $("#passwordRow").attr("hidden","hidden");
            $("#password").val(savedPassword);
        }
    });
});

function getUserData(){
    $.get(url + "getUser.php", {userId: userId}, function(data){
        $("#username").val(data.username);
        $("#email").val(data.email);
        $("#password").val(data.password);
        $("#diet").val(data.diet);
        $("#car").val(data.car);
        savedPassword = data.password;
        levelId = data.level_id;
        $("option[value="+data.level_id+"]").attr("selected", "selected");
    }, "json");
}

function updateUser(){
    $.ajax({
        url: "../php/updateUser.php",
        type: "POST",
        data: formToJs(),
        dataType: "json",
        success: function(data){
            alert("Successfully updated!");
            window.location.href="index.html";
        },
        error: function(something, status, errorThrown){
            $("#error").text("Couldn't update data: " + errorThrown + "\nStatus: " + status);
        }
    });
}

function formToJs(){
    if(getCookie("level") == 1){
        levelId = $("#level :selected").val();
    }
    return {
        user_id: userId,
        username: $("#username").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        diet: $("#diet").val(),
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