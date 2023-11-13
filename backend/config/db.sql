-- TABLAS PARA LA BASE DE DATOS MYSQL
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    apellidos VARCHAR(50) NOT NULL,
    usuario VARCHAR(10) NOT NULL UNIQUE,
    correo VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    rol ENUM('admin', 'medi', 'user') NOT NULL,
    activo TINYINT(1) DEFAULT 1,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE especialidades (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    activo TINYINT(1) DEFAULT 1
);

CREATE TABLE clinicas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(150) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    departamento VARCHAR(50) NOT NULL,
    municipio VARCHAR(50) NOT NULL,
    direccion VARCHAR(150) NOT NULL,
    activo TINYINT(1) DEFAULT 1
);

CREATE TABLE medicos(
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    id_especialidad INT,
    id_clinica INT,
    anios_esperiencia INT,
    fecha_nacimiento DATE,
    pais VARCHAR(50),
    departamento VARCHAR(50),
    ciudad VARCHAR(50),
    fotografia VARCHAR(50),
    licencia VARCHAR(50),
    verificado TINYINT(1) DEFAULT 0,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
    FOREIGN KEY (id_especialidad) REFERENCES especialidades(id),
    FOREIGN KEY (id_clinica) REFERENCES clinicas(id)
);

CREATE TABLE tipos_estudios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    activo TINYINT(1) DEFAULT 1
);

CREATE TABLE estudios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_medico INT NOT NULL,
    id_tipo_estudio INT NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    intituto VARCHAR(100) NOT NULL,
    anio_inicio DATE NOT NULL,
    anio_fin DATE NOT NULL,
    tiempo_meses INT NOT NULL,
    activo TINYINT(1) DEFAULT 1,
    FOREIGN KEY (id_medico) REFERENCES medicos(id),
    FOREIGN KEY (id_tipo_estudio) REFERENCES tipos_estudios(id)
);

CREATE TABLE trabajos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_medico INT NOT NULL,
    id_clinica INT NOT NULL,
    puesto VARCHAR(100) NOT NULL,
    anio_inicio DATE NOT NULL,
    anio_fin DATE NOT NULL,
    tiempo_meses INT NOT NULL,
    activo TINYINT(1) DEFAULT 1,
    FOREIGN KEY (id_medico) REFERENCES medicos(id),
    FOREIGN KEY (id_clinica) REFERENCES clinicas(id)
);

CREATE TABLE tipos_articulos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(150) NOT NULL,
    activo TINYINT(1) DEFAULT 1
);

CREATE TABLE articulos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_medico INT NOT NULL,
    id_tipo_articulo INT NOT NULL,
    titulo VARCHAR(200) NOT NULL,
    descripcion text NOT NULL,
    activo TINYINT(1) DEFAULT 1,
    FOREIGN KEY (id_medico) REFERENCES medicos(id),
    FOREIGN KEY (id_tipo_articulo) REFERENCES tipos_articulos(id)
);

CREATE TABLE comentarios_articulos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_articulo INT NOT NULL,
    id_usuario INT NOT NULL,
    comentario text NOT NULL,
    activo TINYINT(1) DEFAULT 1,
    FOREIGN KEY (id_articulo) REFERENCES articulos(id),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

CREATE TABLE comentarios_medicos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_medico INT NOT NULL,
    id_usuario INT NOT NULL,
    comentario text NOT NULL,
    activo TINYINT(1) DEFAULT 1,
    FOREIGN KEY (id_medico) REFERENCES medicos(id),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);
