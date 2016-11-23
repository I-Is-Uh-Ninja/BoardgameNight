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
$sqlNewTown = "INSERT INTO town (street,number,zipcode,name) VALUES (?,?,?,?);";
$stmt = $conn->prepare($sqlNewTown);
$stmt->bind_param("ssss", $street, $number, $zipcode, $place);
$street = $_POST["street"];
$number = $_POST["number"];
$zipcode = $_POST["zipcode"];
$place = $_POST["place"];
$result = $stmt->execute();
$response = array();
if($result){
    $sqlLinkTownToUser = "INSERT INTO user_has_town (user_id, town_id) VALUES(?,?);";
    $stmt2 = $conn->prepare($sqlLinkTownToUser);
    $stmt2->bind_param("ii", $userId, $townId);
    $townId = $stmt->insert_id;
    $userId = $_COOKIE["user"];
    $result2 = $stmt2->execute();
    
    $response["success"] = $result2;
    $response["general_message"] = $stmt2->insert_id;
    $response["errors"] = $conn->error;
    $stmt2->close();
}
else{
    $response["success"] = $result;
    $response["general_message"] = $stmt->insert_id;
    $response["errors"] = $conn->error;
}
echo json_encode($response);
$stmt->close();
$conn->close();