<?php
// ==== CORS ====
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

session_start();
if (!isset($_SESSION["rol"]) || $_SESSION["rol"] != "usuario") {
    header("Location: index.html");
    exit;
}
?>
<h1>Bienvenido, <?php echo $_SESSION["email"]; ?></h1>
