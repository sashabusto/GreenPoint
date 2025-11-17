<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

try {
    $conn = new PDO("mysql:host=localhost;dbname=greenpoint;charset=utf8", "root", "");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch (PDOException $e) {
    echo json_encode(["error" => "Error al conectar con la base de datos"]);
    exit;
}

try {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data || !is_array($data)) {
        echo json_encode(["error" => "No se recibieron datos válidos"]);
        exit;
    }

    $sql = "INSERT INTO residuos (Id_login, tipo_residuo, otro_residuo, cantidad)
            VALUES (:Id_login, :tipo_residuo, :otro_residuo, :cantidad)";
    $stmt = $conn->prepare($sql);

    foreach ($data as $fila) {
        $stmt->execute([
            ":Id_login" => $fila["Id_login"],
            ":tipo_residuo" => $fila["tipo_residuo"],
            ":otro_residuo" => $fila["otro_residuo"],
            ":cantidad" => $fila["cantidad"],
        ]);
    }

    echo json_encode(["ok" => true]);

} catch (PDOException $e) {
    echo json_encode(["error" => "No se pudieron guardar los materiales"]);
}
