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
$sql = "INSERT INTO game_list (game_id, event_id) VALUES (?,?);";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $gameId, $eventId);

$gameId = $_POST["gameId"];
$eventId = $_POST["eventId"];

$response = array();
$response["success"] = $stmt->execute();
$response["general_message"] = $stmt->insert_id;
$response["errors"] = $conn->error;
$stmt->close();
$conn->close();
exit(json_encode($response));