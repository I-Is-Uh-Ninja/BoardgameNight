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
$sqlDeletePlace = "DELETE FROM place WHERE place_id=?;";
$stmt = $conn->prepare($sqlDeletePlace);
$stmt->bind_param("i", $place_id);
$place_id = $_POST["placeId"];
$result = $stmt->execute();
$response = array();
$response["success"] = $result;
$response["general_message"] = $stmt->insert_id;
$response["errors"] = $conn->error;
echo json_encode($response);
$stmt->close();
$conn->close();