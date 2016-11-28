var url = "http://localhost:800/BoardgameNight/php/";
var userIds = [];

$(document).ready(function(){
    getAllUsers();
});

function getAllUsers(){
    $.get(url + "getUser.php", function(data){
        addUsersToTable(data);
    },"json");
}

function clearTable(){
    $("#headerRow").html("<th>Name</th><th>E-mail</th>");
    $("#tableBody").empty();
}

function addUsersToTable(data){
    var userId = getCookie("user");
    var level = 0;
    if(userId != ""){
        level = getCookie("level");
    }
    if(level == 1){
        $("#headerRow").append("<th>Level</th><th colspan='2'>Action</th>");
    }
    $.each(data, function(index, user){
        userIds[index] = user.user_id;
        $("#tableBody").append("<tr id='" + user.user_id + "'><td>"+user.username+"</td><td>"+user.email+"</td>");
        if(level==1){
            $("tr#"+user.user_id).append("<td>"+ user.level_id +"</td><td><a href='user.html?userId="+user.user_id+"'>Edit user data</a>"
                    + "</td><td><input type='button' id='delete' value='Delete user'/></td></tr>");
        }
        else{
            $("tr#"+user.user_id).append("</tr>");
        }
    });
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

$(document).on("click", "#delete", function(event){
    var tableRow = $(event.target).parent().parent();
    var userId = tableRow.id;
    $.post(url + "deleteUser.php", userId, function(data){
        if(data.success){
            
        }
    }, "json");
});