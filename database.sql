CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(15) NOT NULL UNIQUE,
    nombre VARCHAR(50) NOT NULL,
    bodega INT NOT NULL,
    sucursal INT NOT NULL,
    moneda VARCHAR(10) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    materiales TEXT NOT NULL,
    descripcion TEXT NOT NULL
);

CREATE TABLE bodegas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE sucursales (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    bodega_id INT NOT NULL,
    FOREIGN KEY (bodega_id) REFERENCES bodegas(id) ON DELETE CASCADE
);

CREATE TABLE monedas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    simbolo VARCHAR(10) NOT NULL
);

-- Insertar bodegas
INSERT INTO bodegas (nombre) VALUES ('Bodega Lima'), ('Bodega Piura'), ('Bodega Chiclayo');

-- Insertar sucursales relacionadas con las bodegas
INSERT INTO sucursales (nombre, bodega_id) VALUES 
('Sucursal Lima 1', 1), 
('Sucursal Lima 2', 1), 
('Sucursal Piura 1', 2), 
('Sucursal Piura 2', 2);
('Sucursal Chiclayo 1', 3);

-- Insertar monedas
INSERT INTO monedas (nombre, simbolo) VALUES 
('Dólar Americano', 'USD'), 
('Euro', 'EUR'), 
('Soles', 'SOL');