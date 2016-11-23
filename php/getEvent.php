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

$sqlGetEvent = "SELECT e.*, t.*, u.* FROM event e LEFT JOIN town t ON t.town_id=e.town_id INNER JOIN user u ON u.user_id=e.host_id"
        ." WHERE e.event_id=?;";
$stmt = $conn->prepare($sqlGetEvent);
$stmt->bind_param("i", $eventId);

$eventId = $_GET["eventId"];
$stmt->execute();

$eventResult = $stmt->get_result();
$eventRow = $eventResult->fetch_assoc();
$event_array = array();
$event_array[] = $eventRow;
$stmt->close();

$sqlGetPlayerList = "SELECT pl.*, u.* FROM player_list pl LEFT JOIN user u on pl.user_id=u.user_id WHERE pl.event_id=?";
$stmt2 = $conn->prepare($sqlGetPlayerList);
$stmt2->bind_param("i", $eventId);
$stmt2->execute();

$playerlistResult = $stmt2->get_result();
$player_list = array();
if ($playerlistResult->num_rows > 0) {
    // output data of each row
    while($row = $playerlistResult->fetch_assoc()) {
        $player_list[] = $row;
    }
}
$event_array[] = $player_list;
echo json_encode($event_array);
$stmt2->close();
$conn->close();