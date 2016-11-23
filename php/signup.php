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

$sqlSignup = "INSERT INTO player_list (event_id, user_id, dinner) "
        . "VALUES (?,?,?);";
$stmt = $conn->prepare($sqlSignup);
$stmt->bind_param("iii", $eventId, $userId, $dinner);
$eventId = $_POST["event_id"];
$userId = $_COOKIE["user"];
$dinner = $_POST["dinner"];

$response = array();
$response["success"] = $stmt->execute();
$response["general_message"] = "user signed up for event";
$response["errors"] = $conn->error;
$stmt->close();
$conn->close();
exit(json_encode($response));
