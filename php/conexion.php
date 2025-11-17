<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    $servername = "localhost";
    $username = "grupo4";
    $password = "Et37SAKY_";
    $dbname = "greenpointbd";

    $conn = new mysqli($servername, $username, $password, $dbname);
    $conn->set_charset("utf8mb4");

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => "Error de conexión con la base de datos",
        "detalle" => $e->getMessage() // q no muestre el error real, borrar esta linea
    ]);
    exit;
}
?>
