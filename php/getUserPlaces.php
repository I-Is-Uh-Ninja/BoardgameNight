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
$userId = $_COOKIE["user"];
$sql = "SELECT uhp.*, pl.*  FROM user_has_place uhp INNER JOIN place pl ON uhp.place_id = pl.place_id WHERE uhp.user_id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userId);
$stmt->execute();

$result = $stmt->get_result();
$town_array = array();
if($result->num_rows>0){
    while($row = $result->fetch_assoc()){
        $town_array[] = $row;
    }
    echo json_encode($town_array);
}
$stmt->close();
$conn->close();