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
$sql = "INSERT INTO event (title,date,deadline,host_id,place_id,place,notes) VALUES (?,?,?,?,?,?,?);";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssiiss", $title, $date, $deadline, $hostId, $townId, $place, $notes);

$title = $_POST["title"];
$date = date("Y-m-d H:i:s", strtotime($_POST["date"]));
$deadline = date("Y-m-d H:i:s", strtotime($_POST["deadline"]));
$hostId = $_COOKIE["user"];
$townId = $_POST["place_id"] == 0 ? null : $_POST["place_id"];
$place = $_POST["place"] == "" ? null : $_POST["place"];
$notes = $_POST["notes"] == "" ? null : $_POST["notes"];

$response = array();
$response["success"] = $stmt->execute();
$response["general_message"] = $sql;
$response["errors"] = $conn->error;
$stmt->close();
$conn->close();
exit(json_encode($response));