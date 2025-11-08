<?php
session_start();
if (!isset($_SESSION["rol"]) || $_SESSION["rol"] != "usuario") {
    header("Location: index.html");
    exit;
}
?>
<h1>Bienvenido, <?php echo $_SESSION["email"]; ?></h1>
