
select NoIdentificacion as "id", Nombres as "nombre", Email as "email",'x' as "auth"  into rrhh_masserca_Agentes
from rrhh_masserca_nom where NoIdentificacion = 1010228712 or NoIdentificacion = 1033772595

update rrhh_masserca_Agentes set id = 1000617084 where email = 'bigdata@cusezar.com'

select * from rrhh_masserca_Agentes where Email = 'dgongora@cusezar.com'

/* Tabla Codigos_EPS */
CREATE TABLE rrhh_masserca_Seguimiento (
    id int IDENTITY(1,1) PRIMARY KEY,
	idPropietario int,
	idNovedad int,
	fechaDeCreacion datetime,
	titulo varchar(255),
	detalles text,
	adjuntos text
);

select * from rrhh_masserca_Seguimiento


/* Tabla Codigos_EPS */
CREATE TABLE rrhh_masserca_Codigos_EPS (
    id int IDENTITY(1,1) PRIMARY KEY,
	razonSocial varchar(255),
	telefono varchar(255),
	correo varchar(255)
);

INSERT into rrhh_masserca_Codigos_EPS (razonSocial, telefono, correo) values ('Compensar EPS','57 (1) 444 1234','incapacidades@aseguramientosalud.com')

select * from rrhh_masserca_Codigos_EPS

/* Tabla Tipos de novedad */
CREATE TABLE rrhh_masserca_Tipos_de_Novedad (
    id int IDENTITY(1,1) PRIMARY KEY,
	nombre varchar(255),
	grupo varchar(255),
	idAsignarA int

);

select * from rrhh_masserca_Tipos_de_Novedad

/* Tabla Tipos de novedad */
CREATE TABLE rrhh_masserca_Estados_de_Novedad (
    id int IDENTITY(1,1) PRIMARY KEY,
	nombre varchar(255),
	relevancia int
);

select * from rrhh_masserca_Estados_de_Novedad

/* Tabla Incapacidades */
CREATE TABLE rrhh_masserca_Incapacidades (
    id int IDENTITY(1,1) PRIMARY KEY,
	idAsignadoA int,
	idCreadoPor int,
	fechaDeCreacion datetime default getdate(),
	fechaDeCierre datetime,
	idPropietario int,
	fechaDeInicio datetime,
	fechaDeFin datetime,
	idEps int,
	codigoIncapacidad varchar(255),
	idDiagnostico varchar(255),
	idEstado int,
	adjuntosIncapacidad text,
	adjuntosHistoriaClinica text
);

drop table rrhh_masserca_Incapacidades

select * from rrhh_masserca_Incapacidades

/* Tabla Novedades */
CREATE TABLE rrhh_masserca_Novedades (
    id int IDENTITY(1,1) PRIMARY KEY,
	idTipo int,
	idAsignadoA int,
	idCreadoPor int,
	fechaDeCreacion datetime default getdate(),
	fechaDeCierre datetime,
	idPropietario int,
	fechaDeInicio datetime,
	fechaDeFin datetime,
	idEps int,
	codigoIncapacidad varchar(255),
	idDiagnostico varchar(255),

	idEstado int default 1,
	adjuntos text
);
drop table rrhh_masserca_Incapacidades
select * from rrhh_masserca_Novedades

/**/
drop table rrhh_masserca_Novedades

select * from rrhh_masserca_Codigos_Incapacidades_Medicas
select * from rrhh_masserca_nom WHERE Nombres like '%gongo%' or Nombres like '%julieth osorio nossa%'
drop table rrhh_masserca_Novedades