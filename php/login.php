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

$email = $_POST["email"];
$userpass = $_POST["password"];

$sql = "SELECT * FROM user WHERE email=?;";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();

$result = $stmt->get_result();
$success = false;
$message = null;
if($result->num_rows>0){
    $row = $result->fetch_assoc();
    if($row["password"] == $userpass){
        setcookie("user", $row["user_id"], time() + (86400), "/");
        setcookie("level", $row["level_id"], time() + (86400), "/");
        $success = true;
        $message = $row["user_id"];
    }
    else{
        $message = "invalid password";
    }
}
else{
    $message="invalid email";
}
$response = array();
$response["success"] = $success;
$response["message"] = $message;
$response["errors"] = $conn->error;
$stmt->close();
$conn->close();
echo json_encode($response);
