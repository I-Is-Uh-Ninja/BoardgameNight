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

$query = "DELETE FROM player_list WHERE user_id=? AND event_id=?";
$stmt = $conn->prepare($query);
$stmt->bind_param("ii", $userId, $eventId);
$userId = $_COOKIE["user"];
$eventId = $_POST["event_id"];
$result = $stmt->execute();

$response = array();
$response["success"] = $result;
$response["general_message"] = $stmt->insert_id;
$response["errors"] = $conn->error;
$stmt->close();
$conn->close();
exit(json_encode($response));