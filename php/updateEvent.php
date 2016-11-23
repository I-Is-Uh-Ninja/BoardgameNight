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

$sql = "UPDATE event SET title=?, place=?, date=?, deadline=?, town_id=?, notes=? WHERE event_id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssisi", $title, $place, $date, $deadline, $townId, $notes, $eventId);
$title = $_POST["title"];
$date = date("Y-m-d H:i:s", strtotime($_POST["date"]));
$deadline = date("Y-m-d H:i:s", strtotime($_POST["deadline"]));
$townId = $_POST["town_id"] == 0 ? null : $_POST["town_id"];
$place = $_POST["place"] == "" ? null : $_POST["place"];
$notes = $_POST["notes"] == "" ? null : $_POST["notes"];
$eventId = $_POST["event_id"];

$response = array();
$response["success"] = $stmt->execute();
$response["general_message"] = $stmt->insert_id;
$response["errors"] = $conn->error;
$stmt->close();
$conn->close();
exit(json_encode($response));
