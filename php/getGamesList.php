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
$sql = "SELECT gl.*, g.* FROM game_list gl INNER JOIN game g ON gl.game_id=g.game_id WHERE gl.event_id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $eventId);
$eventId = $_GET["eventId"];
$stmt->execute();

$result = $stmt->get_result();
$gameList = array();
if(!$result){
    echo "null";
}
else{
    while($row = $result->fetch_assoc()){
        $gameList[] = $row;
    }
}
$stmt->close();
$conn->close();
echo json_encode($gameList);