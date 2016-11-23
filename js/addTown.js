var url = "http://localhost:800/BoardgameNight/php/";

$(document).ready(function(){
    $("#addTownBtn").click(function(){
        if($("#addTownForm").valid()){
            if(postForm()){
                window.location.href="../html/index.html";
            }
            else{
                $("#error").text("Couldn't add town!");
            }
        }
    });
});

function postForm(){
    $.post(url + "addTown.php", formToJs(), function(data){
        if(data.success !== undefined){
            return data.success;
        }
        else {
            return true;
        }
    });
}

function formToJs(){
    return {
        street: $("#street").val(),
        number: $("#number").val(),
        zipcode: $("#zipcode").val(),
        place: $("#place").val()
    };
}

$("#addTownForm").validate({
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
        place: {
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
        place: {
            required: "Please fill in a town name",
            maxlength: jQuery.validator.format("Town name cannot be longer than {0} characters")
        }
    }
});