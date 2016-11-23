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
    
    $playerSql = "SELECT pl.*, e.* FROM player_list pl INNER JOIN event e ON pl.event_id=e.event_id WHERE pl.user_id=?";
    $stmt = $conn->prepare($playerSql);
    $stmt->bind_param("i", $cookieUser);
    $cookieUser = $_COOKIE["user"];
    $stmt->execute();
    
    $playerList = $stmt->get_result();
    $player_array = array();
    echo '{"playerList":';
    while($row = $playerList->fetch_assoc()) {
        $player_array[] = $row;
    }
    echo json_encode($player_array);
    $stmt->close();
    if($_COOKIE["level"] === "2" || $_COOKIE["level"] === "1"){
        $hostSql = "SELECT * FROM event WHERE host_id=?";
        $stmt2 = $conn->prepare($hostSql);
        $stmt2->bind_param("i", $cookieUser);
        $stmt2->execute();
        
        $hostList = $stmt2->get_result();
        $host_array = array();
        echo ',"hostList":';
        while($row = $hostList->fetch_assoc()) {
            $host_array[] = $row;
        }
        echo json_encode($host_array)."}";
    }
    else{
        echo "null}";
    }
}
else {
    echo "No user found! Please <a href='../html/login.html'>log in</a>";
}
$conn->close();
