<?php
$servername = "localhost";
$username = "root";
$password = "in070194";
$dbname = "boardgamenight";
$port = "3306";
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname, $port);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$cookieUser;
if(isset($_COOKIE["user"])){
    $cookieUser = $_COOKIE["user"];
    $eventId = $_GET["eventId"];
    $playerSql = "SELECT COUNT(*) FROM player_list WHERE user_id=".$cookieUser." AND event_id=".$eventId;
    $result = $conn->query($sql);
    if($_COOKIE["level"] === "host" || $_COOKIE["level"] === "admin"){
        $hostSql = "SELECT COUNT(*) FROM event WHERE host_id=".$cookieUser." AND event_id=".$eventId;
        $result2 = $conn->query($hostSql);
    }
    if(mysqli_result($result, 0) > 0 || mysqli_result($result2) > 0){
        echo "{'result':true}";
    }
    else {
        echo "{'result':false}";
    }
}
else{
    echo "No user found! Please <a href='../html/login.html'>log in</a>";
}
