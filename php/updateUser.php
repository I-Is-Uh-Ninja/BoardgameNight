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

$sql = "UPDATE user SET username=?, password=?, email=?, level_id=?, diet=?, car=? WHERE user_id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssissi", $username, $cryptPassword, $email, $levelId, $diet, $car, $userId);
$username = $_POST["username"];
$userpass = $_POST["password"];
if(strpos($userpass, '$2y$') === false){
    $cryptPassword = password_hash($userpass, PASSWORD_BCRYPT);
}
else{
    $cryptPassword = $userpass;
}
$email = $_POST["email"];
$levelId = $_POST["level_id"];
$userId = $_POST["user_id"];
$diet = $_POST["diet"] == "" ? null : $_POST["diet"];
$car = $_POST["car"] == "" ? null : $_POST["car"];

$response = array();
$response["success"] = $stmt->execute();
$response["general_message"] = $stmt->insert_id;
$response["errors"] = $conn->error;
$stmt->close();
$conn->close();
exit(json_encode($response));