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
$sqlCheckPlaceExists = "SELECT * FROM place WHERE zipcode=? AND number=?";
$stmtCheck = $conn->prepare($sqlCheckPlaceExists);
$stmtCheck->bind_param("ss", $zipcode, $number);

$street = $_POST["street"];
$number = $_POST["number"];
$zipcode = $_POST["zipcode"];
$town = $_POST["town"];

$resultCheck = $stmtCheck->execute();
$response = array();
$place_id = -1;
$result = false;

if(!$resultCheck){
    $sqlNewTown = "INSERT INTO place (street,number,zipcode,name) VALUES (?,?,?,?);";
    $stmt = $conn->prepare($sqlNewTown);
    $stmt->bind_param("ssss", $street, $number, $zipcode, $town);
    $result = $stmt->execute();
    $place_id = $stmt->insert_id;
    $stmt->close();
}
else{
    $existingRow = $stmtCheck->get_result();
    $existingPlace = $existingRow->fetch_object();
    $place_id = $existingPlace->place_id;
}
$stmtCheck->close();

if($result || $resultCheck){
    $sqlLinkTownToUser = "INSERT INTO user_has_place (user_id, place_id) VALUES(?,?);";
    $stmt2 = $conn->prepare($sqlLinkTownToUser);
    $stmt2->bind_param("ii", $userId, $place_id);
    $userId = $_COOKIE["user"];
    $result2 = $stmt2->execute();
    
    $response["success"] = $result2;
    $response["general_message"] = "User_has_place_id: $stmt2->insert_id";
    $response["errors"] = $conn->error;
    $stmt2->close();
}
else{
    $response["success"] = false;
    $response["general_message"] = "Place id: $place_id";
    $response["errors"] = $conn->error;
}
echo json_encode($response);
$conn->close();