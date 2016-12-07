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

$sql = "UPDATE game SET title=?, description=?, image=?, link=? WHERE game_id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssi", $title, $descr, $image, $link, $gameId);
$title = $_POST["title"];
$gameId = $_POST["gameId"];
$descr = $_POST["description"] == "" ? null : $_POST["description"];
$image = $_POST["image"] == "" ? null : $_POST["image"];
$link = $_POST["link"] == "" ? null : $_POST["link"];

$response = array();
$response["success"] = $stmt->execute();
$response["general_message"] = $stmt->insert_id;
$response["errors"] = $conn->error;
$stmt->close();
$conn->close();
exit(json_encode($response));