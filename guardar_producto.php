<?php
// Conectar a la base de datos
require 'conexion.php';

// Validar el código del producto
$codigo = $_POST['codigo'];
$stmt = $conn->prepare("SELECT id FROM productos WHERE codigo = :codigo");
$stmt->execute(['codigo' => $codigo]);

if ($stmt->rowCount() > 0) {
    echo json_encode(['success' => false, 'message' => 'El código del producto ya está registrado']);
    exit();
}

// Insertar el producto en la base de datos
$nombre = $_POST['nombre'];
$bodega_id = $_POST['bodega'];
$sucursal_id = $_POST['sucursal'];
$moneda_id = $_POST['moneda'];
$precio = $_POST['precio'];
$materiales = $_POST['material'];
$descripcion = $_POST['descripcion'];

$sql = "INSERT INTO productos (codigo, nombre, bodega_id, sucursal_id, moneda_id, precio, materiales, descripcion) 
        VALUES (:codigo, :nombre, :bodega, :sucursal, :moneda, :precio, :materiales, :descripcion)";
$stmt = $conn->prepare($sql);

$params = [
    ':codigo' => $codigo,
    ':nombre' => $nombre,
    ':bodega' => $bodega_id,
    ':sucursal' => $sucursal_id,
    ':moneda' => $moneda_id,
    ':precio' => $precio,
    ':materiales' => $materiales,
    ':descripcion' => $descripcion
];

if ($stmt->execute($params)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al guardar el producto']);
}
// ahi esta :)
?>