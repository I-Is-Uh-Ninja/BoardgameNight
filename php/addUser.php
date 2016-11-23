<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>
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
        $sql = "INSERT INTO user (username, password, email, level_id, diet, car) VALUES(?,?,?,?,?,?);";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssiss", $username, $password, $email, $levelId, $diet, $car);
        $username = $_POST["username"];
        $password = date("dmY");
        $email = $_POST["email"];
        $levelId = $_COOKIE["level"];
        $diet = $_POST["diet"] == "" ? null : $_POST["diet"];
        $car = $_POST["car"] == "" ? null : $_POST["car"];
        
        if ($stmt->execute() === true){
            echo "<p>New user created successfully.";
            $to = $_POST["email"];
            $txt = "Hello ".$_POST["username"]."!\n\nYou have been registered as a user for boardgamenight.nl!"
                    ."\nYour can login with this e-mail address and password."
                    ."\nYour current password is: ".$password.". We advice you to change this to something safer."
                    ."\n\nIf you don't want to be registered, click here: http://boardgamenight.nl/removeUser/".$conn->insert_id;
            $header = "From: iannijhuis@gmail.com";
            echo "<br><a href='mailto:".$to."?subject=Registration boardgamenight.nl&body=".$txt
                    ."'>Click here to send a mail to notify them.</a></p>";
        }
        else{
            echo "<p class='error'>User not created! Error: ".$conn->error."</p>";
            echo "<br><a href='../html/addUser.html'>Click here to go back</a>";
        }
        $stmt->close();
        $conn->close();
        ?>
    </body>
</html>
