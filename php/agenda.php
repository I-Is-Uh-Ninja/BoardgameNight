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
$sqlGetAgenda = "SELECT e.*, pl.*, u.* FROM event e LEFT JOIN place pl ON pl.place_id=e.place_id INNER JOIN user u ON u.user_id=e.host_id ORDER BY e.date ASC;";
$result = $conn->query($sqlGetAgenda);
$agenda_array = array();
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        $agenda_array[] = $row;
    }
    echo json_encode($agenda_array);
} else {
    echo "null";
}
$conn->close();
?>
