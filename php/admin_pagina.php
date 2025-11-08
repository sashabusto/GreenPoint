<?php
session_start();
if (!isset($_SESSION["rol"]) || $_SESSION["rol"] != "admin") {
    header("Location: index.html");
    exit;
}
?>
<h1>Bienvenido, administrador <?php echo $_SESSION["email"]; ?></h1>
