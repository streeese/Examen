CREATE TABLE IF NOT EXIST usuario(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    correo TEXT,
    passw TEXT
);

INSERT OR IGNORE INTO usuario(id, nombre, correo, passw) VALUES(1, Juan Lopez, USUARIO1@GMAIL.COM, USER1);
INSERT OR IGNORE INTO usuario(id, nombre, correo, passw) VALUES(2, Maria Torres, USUARIO1@GMAIL.COM, USER2);
INSERT OR IGNORE INTO usuario(id, nombre, correo, passw) VALUES(3, Jorge Mendoza, USUARIO1@GMAIL.COM, USER3);
INSERT OR IGNORE INTO usuario(id, nombre, correo, passw) VALUES(4, Rosa Diaz, USUARIO1@GMAIL.COM, USER4);
