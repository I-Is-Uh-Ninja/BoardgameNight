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
if(isset($_GET["userId"])){
    $sql = "SELECT * FROM user WHERE user_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $userId);
    $userId = $_GET["userId"];
}
else{
    $sql = "SELECT * FROM user;";
    $stmt = $conn->prepare($sql);
}
$stmt->execute();

$result = $stmt->get_result();
$user_array = array();
if(!$result){
    echo "null";
}
else{
    if(isset($_GET["userId"])){
        echo json_encode($result->fetch_object());
    }
    else{
        $response = array();
        while($row = $result->fetch_assoc()){
            $response[] = $row;
        }
        echo json_encode($response);
    }
}
$stmt->close();
$conn->close();