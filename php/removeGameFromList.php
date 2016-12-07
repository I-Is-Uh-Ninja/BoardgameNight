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

$query = "DELETE FROM game_list WHERE game_id=? AND event_id=?";
$stmt = $conn->prepare($query);
$stmt->bind_param("ii", $gameId, $eventId);
$gameId = $_POST["gameId"];
$eventId = $_POST["eventId"];
$result = $stmt->execute();

$response = array();
$response["success"] = $result;
$response["general_message"] = $stmt->insert_id;
$response["errors"] = $conn->error;
$stmt->close();
$conn->close();
exit(json_encode($response));