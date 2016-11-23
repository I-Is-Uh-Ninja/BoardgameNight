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
$sql = "SELECT * FROM user WHERE user_id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userId);
$userId = $_GET["userId"];
$stmt->execute();

$result = $stmt->get_result();
$user_array = array();
if(!$result){
    echo "null";
}
else{
    echo json_encode($result->fetch_object());
}
$stmt->close();
$conn->close();