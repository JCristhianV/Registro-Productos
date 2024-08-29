<?php
// Conexión a la base de datos
require 'conexion.php';

// Obtener el código del producto desde la solicitud AJAX
$codigo = $_GET['codigo'] ?? '';

if (!$codigo) {
    echo json_encode(['exists' => false]);
    exit;
}

// Consulta para verificar si el código ya existe
$query = $conn->prepare("SELECT COUNT(*) FROM productos WHERE codigo = :codigo");
$query->execute([':codigo' => $codigo]);

// Devolver el resultado de la verificación
if ($query->fetchColumn() > 0) {
    echo json_encode(['exists' => true]);
} else {
    echo json_encode(['exists' => false]);
}
?>