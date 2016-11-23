$(document).ready(function(){
    $("#addUserBtn").click(function(event){
        //event.preventDefault();
        alert("Valid?: " + $("#addUserForm").valid());
        if($("#addUserForm").valid()){
            $("#addUserForm").submit();
        }
    });
});


$("#addUserForm").validate({
    rules: {
        username:{
            required: true,
            maxlength: 25
        },
        email:{
            required: true,
            maxlength: 80,
            email: true
        },
        level:{
            required: true
        },
        diet:{
            maxlength: 80
        },
        car:{
            maxlength: 25
        }
    },
    messages: {
        username: {
            required: "Name is required",
            maxlength: jQuery.validator.format("Name cannot be more than {0} characters long")
        },
        email: {
            required: "E-mail is required",
            maxlength: jQuery.validator.format("E-mail cannot be more than {0} characters long"), //{0} is a callback to the maxlength value
            email: "Not a valid e-mail address"
        },
        level : {
            required: "User-level is required"
        },
        diet : {
            maxlength: jQuery.validator.format("Diet or allergy specifications cannot be more than {0} characters long")
        },
        car : {
            maxlength: jQuery.validator.format("Car information cannot be more than {0} characters long")
        }
    }
});