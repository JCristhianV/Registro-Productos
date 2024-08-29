<?php
// Conexión a la base de datos
try {
    $conn = new PDO("pgsql:host=localhost;dbname=prueba", "postgres", "admin");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode(['success' => false, 'message' => 'Error de conexión a la base de datos: ' . $e->getMessage()]));
}
?>