var url = "http://localhost:800/BoardgameNight/php/";
var message = "";

$(document).ready(function(){
    if(getCookie("user") == ""){
        window.location.href = "login.html";
    }
    $("#addPlaceBtn").click(function(){
        if($("#addPlaceForm").valid()){
            if(postForm()){
                window.location.href="../html/index.html";
            }
            else{
                $("#error").text("Couldn't add place: " + message);
            }
        }
    });
});

function postForm(){
    $.post(url + "addPlace.php", formToJs(), function(data){
        message = data[0].general_message;
        return data[0].success;
    }, "json");
}

function formToJs(){
    return {
        street: $("#street").val(),
        number: $("#number").val(),
        zipcode: $("#zipcode").val(),
        town: $("#town").val()
    };
}

$("#addPlaceForm").validate({
    rules: {
        street: {
            required: true,
            maxlength: 51
        },
        number: {
            required: true,
            maxlength: 10
        },
        zipcode: {
            required: true,
            maxlength: 6,
            minlength: 6
        },
        town: {
            required: true,
            maxlength: 51
        }
    },
    messages: {
        street: {
            required: "Please fill in a street name",
            maxlength: jQuery.validator.format("Street name cannot be longer than {0} characters")
        },
        number: {
            required: "Please fill in a house number",
            maxlength: jQuery.validator.format("House number with additions cannot be longer than {0} characters")
        },
        zipcode: {
            required: "Please fill in a zip-code",
            maxlength: jQuery.validator.format("Zip-code must be {0} characters long"),
            minlength: jQuery.validator.format("Zip-code must be {0} characters long")
        },
        town: {
            required: "Please fill in a town name",
            maxlength: jQuery.validator.format("Town name cannot be longer than {0} characters")
        }
    }
});