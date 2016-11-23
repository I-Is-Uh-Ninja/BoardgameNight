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

$sql = "DELETE FROM event WHERE event_id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $eventId);
$eventId = $_POST["event_id"];

$response = array();
$response["success"] = $stmt->execute();
$response["general_message"] = $eventId;
$response["errors"] = $conn->error;
$stmt->close();
$conn->close();
exit(json_encode($response));