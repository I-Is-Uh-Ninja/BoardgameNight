<?php
require("../lib/class.phpmailer.php");
require("../lib/class.smtp.php");
require("../lib/class.phpmaileroauthgoogle.php");

//Get e-mail addresses from player ids
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

$sqlGetEmail = "SELECT email FROM user WHERE user_id=?";
$stmt = $conn->prepare($sqlGetEmail);
$stmt->bind_param("i", $playerId);

//find host email first
$playerId = $_COOKIE["user"];
$stmt->execute();
$hostEmail = $stmt->get_result()->fetch_object()->email;

$emailList = array();
$playerList = $_POST["user_ids"];
for ($index = 0;$index < count($playerList);$index++) {
    $playerId = $playerList[$index];
    $stmt->execute();
    $result = $stmt->get_result();
    $emailList[] = $result->fetch_object()->email;
}
$stmt->close();
$conn->close();

//$password = $_GET["password"];
$subject = $_POST["subject"];
$body = $_POST["body"];

//Send email
$mail = new PHPMailer(); // create a new object
$mail->IsSMTP(); // enable SMTP
$mail->SMTPDebug = 2; // debugging: 1 = errors and messages, 2 = messages only
$mail->SMTPAuth = true; // authentication enabled
$mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for Gmail
$mail->Host = "smtp.gmail.com";
$mail->Port = 465; // or 587
$mail->IsHTML(true);
$mail->Username = "iannijhuis@gmail.com";
$mail->Password = "rzypkuoayzejrfix";
$mail->SetFrom("iannijhuis@gmail.com");
$mail->Subject = $subject;
$mail->Body = $body;
foreach($emailList as $email){
    $mail->addAddress($email);
}

$response = array();

 if(!$mail->Send()) {
    $message = $mail->ErrorInfo;
    $response["success"]=false;
    $response["message"]=$message;
 } else {
    $response["success"]=true;
    $response["message"]="";
 }
 
 echo json_encode($response);