var url = "http://localhost:800/BoardgameNight/php/";

$("#loginForm").validate({
    rules: {
        email:{
            required: true,
            maxlength: 80,
            email: true
        },
        password:{
            required: true,
            maxlength: 25
        }
    },
    messages: {
        email: {
            required: "E-mail is required",
            maxlength: jQuery.validator.format("E-mail cannot be more than {0} characters long"), //{0} is a callback to the maxlength value
            email: "Not a valid e-mail address"
        },
        password: {
            required: "Password is required",
            maxlength: jQuery.validator.format("Password cannot be more than {0} characters long")
        }
    }
});
$(document).ready(function(){
    $("#loginButton").click(function(event){
        if($("#loginForm").valid()){
            logIn();
        }
    });
});

function formToJs(){
    return {
        email: $("#email").val(),
        password: $("#password").val()
    };
}

function logIn(){
    $.post(url+"login.php", formToJs(), function(data){
        if(data.success){
            window.location.href = "index.html";
        }
        else {
            var message = data.message;
            if(message.search("email")>0){
                $("#error").text("Couldn't log in: incorrect e-mail.");
            }
            else if(message.search("password")>0){
                $("#error").text("Couldn't log in: incorrect password.");
            }
            else{
                $("#error").text("Couldn't log in!");
            }
        }
    }, "json");
}