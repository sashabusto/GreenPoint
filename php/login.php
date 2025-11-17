<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("conexion.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $data = json_decode(file_get_contents("php://input"), true);

    $email = $data["email"];
    $contrasena = $data["contrasena"];

    $sql = "SELECT * FROM login WHERE email = ? AND contrasena = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $email, $contrasena);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $usuario = $result->fetch_assoc();

        echo json_encode([
            "success" => true,
            "email" => $usuario["email"],
            "rol" => $usuario["rol"]
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Correo o contraseña incorrectos"
        ]);
    }
}
?>
