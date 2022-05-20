/*
||
|| Tablas
||
*/
/* Tabla Roles */
create table Control_MD_Roles_de_Usuario (
	id int IDENTITY(1,1) PRIMARY KEY,
	fechaDeCreacion datetime default getdate() not null,
	ultimaFechaDeEdicion datetime default getdate() not null,
	nombre varchar(255) not null
)
select * from Control_MD_Roles_de_Usuario
insert into Control_MD_Roles_de_Usuario (nombre) values ('Residente')
select * from Control_MD_Roles_de_Usuario
drop table Control_MD_Roles_de_Usuario
/*
*/

/* Tabla Tipos */
create table Control_MD_Tipos_de_Usuarios (
	id int IDENTITY(1,1) PRIMARY KEY,
	fechaDeCreacion datetime default getdate() not null,
	ultimaFechaDeEdicion datetime default getdate() not null,
	nombre varchar(255) not null,
)
select * from Control_MD_Tipos_de_Usuarios
insert into Control_MD_Tipos_de_Usuarios (nombre) values ('Almacenista')
select * from Control_MD_Tipos_de_Usuarios
drop table Control_MD_Tipos_de_Usuarios
/*
*/

/* Tabla Estados */
create table Control_MD_Estados_de_Usuarios (
	id int IDENTITY(1,1) PRIMARY KEY,
	fechaDeCreacion datetime default getdate() not null,
	ultimaFechaDeEdicion datetime default getdate() not null,
	nombre varchar(255) not null,
)
select * from Control_MD_Estados_de_Usuarios
insert into Control_MD_Estados_de_Usuarios (nombre) values ('Activo')
insert into Control_MD_Estados_de_Usuarios (nombre) values ('Inactivo')
select * from Control_MD_Estados_de_Usuarios
drop table Control_MD_Estados_de_Usuarios
/*
*/

/* Tabla Estados de articulo */
create table Control_MD_Estados_de_Articulo (
	id int IDENTITY(1,1) PRIMARY KEY,
	fechaDeCreacion datetime default getdate() not null,
	ultimaFechaDeEdicion datetime default getdate() not null,
	nombre varchar(255) not null,
)
select * from Control_MD_Estados_de_Articulo
insert into Control_MD_Estados_de_Articulo (nombre) values ('Activo')
insert into Control_MD_Estados_de_Articulo (nombre) values ('Inactivo')
select * from Control_MD_Estados_de_Articulo
drop table Control_MD_Estados_de_Articulo
/*
*/

/* Tabla Estados de Movimiento de articulo */
create table Control_MD_Estados_de_Movimiento_de_Articulo (
	id int IDENTITY(1,1) PRIMARY KEY,
	fechaDeCreacion datetime default getdate() not null,
	ultimaFechaDeEdicion datetime default getdate() not null,
	nombre varchar(255) not null,
)
select * from Control_MD_Estados_de_Movimiento_de_Articulo
insert into Control_MD_Estados_de_Movimiento_de_Articulo (nombre) values ('Activo')
insert into Control_MD_Estados_de_Movimiento_de_Articulo (nombre) values ('Inactivo')
select * from Control_MD_Estados_de_Movimiento_de_Articulo
drop table Control_MD_Estados_de_Movimiento_de_Articulo
/*
*/

/* Tabla Locaciones */
create table Control_MD_Locaciones (
	id int IDENTITY(1,1) PRIMARY KEY,
	fechaDeCreacion datetime default getdate() not null,
	ultimaFechaDeEdicion datetime default getdate() not null,
	nombre varchar(255) not null,
	direccion varchar(255),
	telefono varchar(255)
)
select * from Control_MD_Locaciones
insert into Control_MD_Locaciones (nombre) values ('Torre Cusezar')
select * from Control_MD_Locaciones
drop table Control_MD_Control_MD_Locaciones
/*
*/

/* Tabla Grupo de articulos */
create table Control_MD_Grupo_de_Articulos (
	id int IDENTITY(1,1) PRIMARY KEY,
	fechaDeCreacion datetime default getdate() not null,
	ultimaFechaDeEdicion datetime default getdate() not null,
	nombre varchar(255) not null,
)
select * from Control_MD_Grupo_de_Articulos
insert into Control_MD_Grupo_de_Articulos (nombre) values ('Almacenista')
select * from Control_MD_Grupo_de_Articulos
drop table Control_MD_Grupo_de_Articulos
/*
*/

/* Tabla Articulos */
create table Control_MD_Articulos (
	id int IDENTITY(1,1) PRIMARY KEY,
	fechaDeCreacion datetime default getdate() not null,
	ultimaFechaDeEdicion datetime default getdate() not null,
	nombre varchar(255) not null,
	idGrupo int,
	idCreadoPor int not null,
	fechaDeCaducidad int,
	idLocacion int, 
)
select * from Control_MD_Articulos
insert into Control_MD_Articulos (nombre, idCreadoPor) values ('ARNES RRHH',1)
select * from Control_MD_Articulos
drop table Control_MD_Articulos
/*
*/

/* Tabla Contratistas */
create table Control_MD_Empresas_Contratistas (
	id int IDENTITY(1,1) PRIMARY KEY,
	fechaDeCreacion datetime default getdate() not null,
	ultimaFechaDeEdicion datetime default getdate() not null,
	nombre varchar(255) not null,
	telefono varchar(255),
	correo varchar(255),
)
select * from Control_MD_Empresas_Contratistas
drop table Control_MD_Empresas_Contratistas
/*
*/

/* Tabla usuarios */
create table Control_MD_Usuarios (
	id int IDENTITY(1,1) PRIMARY KEY,
	idRol int not null,
	nombre varchar(255) not null,
	email varchar(255),
	username varchar(255) not null,
	password varchar(255),
	idTipo int not null,
	idEstado int not null
)
select * from Control_MD_Usuarios
insert into Control_MD_Usuarios (idRol, nombre, username, password, idTipo, idEstado) values (1,'Juan Pablo Roa', jpablo, 0, 1, 1) 
drop table Control_MD_Usuarios
/*
*/

/* Tabla usuarios */
create table Control_MD_Registros(
	id int IDENTITY(1,1) PRIMARY KEY,
	fechaDeCreacion datetime default getdate() not null,
	ultimaFechaDeEdicion datetime default getdate() not null,
	idArticulo int not null,
	idUsuario int not null,
	idEstado int not null
)
select * from Control_MD_Registros
insert into Control_MD_Registros (idArticulo, idUsuario, idEstado) values ()
drop table Control_MD_Registros
/*
*/
select * from [Control_MD_Consulta_Usuarios]
select * from Control_MD_Consulta_Usuarios
/*
||
|| Vistas
||
*/

/* 
 Vista Usuario

create table Control_MD_Usuarios (
	id as Id,
	idRol as Rol,
	nombre varchar(255) not null,
	email varchar(255),
	username varchar(255) not null,
	password varchar(255),
	idTipo int not null,
	idEstado int not null
) 
*/
go
create view Control_MD_Consulta_Usuarios as
select Usuario.id as "id", Rol.nombre as "rol", Usuario.nombre as "nombre", Usuario.email as "email", Usuario.username as "username", Tipo.nombre as "tipo", Estado.nombre as "estado"
from Control_MD_Usuarios Usuario
left join Control_MD_Roles_de_Usuario Rol
on Rol.id = Usuario.idRol
left join Control_MD_Tipos_de_Usuarios Tipo
on Tipo.id = Usuario.idTipo
left join Control_MD_Estados_de_Usuarios Estado
on Estado.id = Usuario.idEstado
/*
*/

/*
 Vista Registro

create table Control_MD_Registros(
	id int IDENTITY(1,1) PRIMARY KEY,
	fechaDeCreacion datetime default getdate() not null,
	ultimaFechaDeEdicion datetime default getdate() not null,
	idArticulo int not null,
	idUsuario int not null,
	idEstado int not null
)
*/
go
create view Control_MD_Consulta_Registros as
select Registro.id as "id", Registro.fechaDeCreacion as "fechaDeCreacion", Registro.ultimaFechaDeEdicion as "ultimaFechaDeEdicion", Articulo.nombre as "nombreArticulo", Articulo.fechaDeCaducidad as "fechaDeCaducidad", Usuario.nombre as "prestatario", Estado.nombre as "Estado"

