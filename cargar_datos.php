<?php
// Conectar a la base de datos
require 'conexion.php';

// Determinar la acción a realizar
$action = $_GET['action'] ?? '';

switch ($action) {
    case 'getBodegas':
        getBodegas($conn);
        break;
    case 'getSucursales':
        $bodegaId = $_GET['bodegaId'] ?? 0;
        getSucursales($conn, $bodegaId);
        break;
    case 'getMonedas':
        getMonedas($conn);
        break;
    default:
        echo json_encode([]);
}

// Función para obtener Bodegas
function getBodegas($conn) {
    $stmt = $conn->prepare("SELECT id, nombre FROM bodegas ORDER BY nombre");
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
}

// Función para obtener Sucursales por Bodega
function getSucursales($conn, $bodegaId) {
    $stmt = $conn->prepare("SELECT id, nombre FROM sucursales WHERE bodega_id = :bodega_id ORDER BY nombre");
    $stmt->execute([':bodega_id' => $bodegaId]);
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
}

// Función para obtener Monedas
function getMonedas($conn) {
    $stmt = $conn->prepare("SELECT id, nombre, simbolo FROM monedas ORDER BY nombre");
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
}
?>