<?php
require("../lib/class.phpmailer.php");
require("../lib/class.smtp.php");
require("../lib/class.phpmaileroauthgoogle.php");

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

$sql = "INSERT INTO user (username, password, email, level_id, diet, car) VALUES(?,?,?,?,?,?);";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssiss", $username, $cryptPassword, $email, $levelId, $diet, $car);
$username = $_POST["username"];
$randPassword = substr(md5(rand()), 0, 7);
$cryptPassword = password_hash($randPassword, PASSWORD_BCRYPT);
$email = $_POST["email"];
$levelId = $_COOKIE["level"];
$diet = $_POST["diet"] == "" ? null : $_POST["diet"];
$car = $_POST["car"] == "" ? null : $_POST["car"];

$success = $stmt->execute();
$stmt->close();
$conn->close();
if($success){
    $mailBody = file_get_contents("../signup_mail_text.txt");
    if($mailBody != ""){
        $mailBody = str_replace("[username]", $username, $mailBody);
        $mailBody = str_replace("[password]", $randPassword, $mailBody);
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
        $mail->Subject = "Sign-up for boardgamenight.nl";
        $mail->Body = $mailBody;
        $mail->AddAddress($email);
        if($mail->Send()){
            echo " Mail sent to $email ! <a href='../html/index.html'>Click here to go to homepage</a>";
        }
        else{
            echo "Couldn't send mail: ".$mail->ErrorInfo;
        }
    }
}
else{
    echo "Couldn't add user!";
}

