<?php
$servername = "localhost";
$username = "saky";
$password = "Et37SAKY_.";
$dbname = "greenpointbd";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "error" => "Error de conexión: " . $conn->connect_error]));
}
?>
