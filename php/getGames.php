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
$sql;
$stmt;
if(isset($_GET["gameId"])){
    $gameId = $_GET["gameId"];
    $sql = "SELECT * FROM game WHERE game_id=?;";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $gameId);
}
else{
    $sql = "SELECT * FROM game;";
    $stmt = $conn->prepare($sql);
}

$stmt->execute();
$result = $stmt->get_result();
$gameList = array();
if(!$result){
    echo "null";
}
else{
    while($row = $result->fetch_assoc()){
        $gameList[] = $row;
    }
}
$stmt->close();
$conn->close();
echo json_encode($gameList);