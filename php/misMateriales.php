<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

include "conexion.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data["Id_login"])) {
        echo json_encode(["error" => "Falta el ID del usuario"]);
        exit;
    }

    $Id_login = $data["Id_login"];

    $sql = "SELECT Id_residuos, tipo_residuo, otro_residuo, cantidad, fecha 
            FROM residuos 
            WHERE Id_login = ? 
            ORDER BY fecha DESC";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $Id_login);
    $stmt->execute();
    $result = $stmt->get_result();

    $materiales = [];

    while ($row = $result->fetch_assoc()) {
        $materiales[] = $row;
    }

    echo json_encode($materiales);
}
?>
