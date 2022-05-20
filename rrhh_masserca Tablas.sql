/* Tabla Agente RRHH */
select NoIdentificacion as "id", Nombres as "nombre", Email as "email",'x' as "auth"  into rrhh_masserca_Agentes
from rrhh_masserca_nom where NoIdentificacion = 1010228712 or NoIdentificacion = 1033772595

ALTER TABLE rrhh_masserca_Agentes
ALTER COLUMN id int NOT NULL 

ALTER TABLE rrhh_masserca_Agentes
ADD PRIMARY KEY (id);

select * from rrhh_masserca_Agentes where id = null
delete from rrhh_masserca_Agentes where email like '%prueba%'

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
delete from rrhh_masserca_Codigos_EPS
select * from rrhh_masserca_Codigos_EPS

/* Tabla Tipos de novedad */
CREATE TABLE rrhh_masserca_Tipos_de_Novedad (
    id int IDENTITY(1,1) PRIMARY KEY,
	nombre varchar(255),
	grupo varchar(255),
	idAsignarA int,
	aprobacion int,
	idAprobacion int
);
delete from rrhh_masserca_Tipos_de_Novedad where id = 8
select * from rrhh_masserca_Tipos_de_Novedad where id = 1

/* Tabla Tipos de novedad */
CREATE TABLE rrhh_masserca_Estados_de_Novedad (
    id int IDENTITY(1,1) PRIMARY KEY,
	nombre varchar(255),
	relevancia int
);
select * from rrhh_masserca_Estados_de_Novedad
insert into rrhh_masserca_Estados_de_Novedad (nombre,relevancia) values ('Enviado a aprobación',1)
insert into rrhh_masserca_Estados_de_Novedad (nombre,relevancia) values ('Apropado',1)

/* Tabla Incapacidades */
CREATE TABLE rrhh_masserca_Incapacidades (
    id int IDENTITY(1,1) PRIMARY KEY,
	idTipoIncapacidad int,
	idAsignadoA int,
	idCreadoPor int,
	fechaDeCreacion datetime,
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
delete from rrhh_masserca_Incapacidades
select * from rrhh_masserca_Incapacidades

/* Tabla tipos de incapacidad*/
create table rrhh_masserca_Tipos_de_Incapacidad (
	id int IDENTITY(1,1) PRIMARY KEY,
	nombre varchar(255),
	relevancia varchar(255)
)
insert into rrhh_masserca_Tipos_de_Incapacidad (nombre,relevancia)values('Ambulatoria',1)
insert into rrhh_masserca_Tipos_de_Incapacidad (nombre,relevancia)values('Licencia de maternidad',1)
insert into rrhh_masserca_Tipos_de_Incapacidad (nombre,relevancia)values('Licencia de paternidad',1)
insert into rrhh_masserca_Tipos_de_Incapacidad (nombre,relevancia)values('Hospitalaria',1)
select * from rrhh_masserca_Tipos_de_Incapacidad

/* Tabla Novedades */
CREATE TABLE rrhh_masserca_Novedades (
    id int IDENTITY(1,1) PRIMARY KEY,
	idTipo int,
	idAsignadoA int,
	idCreadoPor int,
	fechaDeCreacion datetime,
	fechaDeCierre datetime,
	idPropietario int,
	fechaDeInicio datetime,
	fechaDeFin datetime,
	idEps int,
	codigoIncapacidad varchar(255),
	idDiagnostico varchar(255),

	idEstado int,
	adjuntos text
);
delete from rrhh_masserca_Novedades
select * from rrhh_masserca_Novedades

/* Tabla códigos de diagnóstico */

select * from rrhh_masserca_Codigos_Incapacidades_Medicas


/* Power BI query */
select Incapacidades.fechaDeCreacion as "Fecha de creación", Incapacidades.id as "Id", Agente.nombre as "Asignado A", Tipos_Incapacidad.nombre as "Tipo", Incapacidades.codigoIncapacidad as "Código diagnóstico", Incapacidades.idDiagnostico as "Código Incapacidad",
concat(Incapacidades.adjuntosIncapacidad,Incapacidades.adjuntosHistoriaClinica) as "Adjuntos" ,Eps.RazonSocial as "Eps", Incapacidades.fechaDeInicio as "Fecha de Inicio", Incapacidades.fechaDeFin as "Fecha de Fin", datediff(day, Incapacidades.fechaDeInicio,Incapacidades.fechaDeFin) as "Número de días",
Colaborador.NoIdentificacion as "Cédula Solicitante", Colaborador.Nombres as "Solicitante", Colaborador.Cargo as "Cargo", Estado.nombre as "Estado"
from rrhh_masserca_Incapacidades Incapacidades
left join rrhh_masserca_Tipos_de_Incapacidad Tipos_Incapacidad
on Incapacidades.idTipoIncapacidad = Tipos_Incapacidad.id
left join rrhh_masserca_Agentes Agente
on Incapacidades.idAsignadoA = Agente.id
left join rrhh_masserca_Codigos_EPS Eps
on Incapacidades.idEps = Eps.Id
left join rrhh_masserca_nom Colaborador
on Incapacidades.idPropietario = Colaborador.NoIdentificacion
left join rrhh_masserca_Estados_de_Novedad Estado
on Incapacidades.idEstado = Estado.id


select Novedades.fechaDeCreacion as "Fecha de creación", Novedades.id as "Id",Tipos_Novedad.nombre as "Tipo", Agente.Nombre as "Asignado A", Novedades.descripcion as "Descripción", Novedades.adjuntos as "Adjuntos", Colaborador.Nombres as "Solicitante",Colaborador.NoIdentificacion as "Cédula", Colaborador.Cargo as "Cargo",Estado.nombre as "Estado"
from rrhh_masserca_Novedades Novedades
left join rrhh_masserca_Agentes Agente
on Novedades.idAsignadoA = Agente.id
left join rrhh_masserca_Tipos_de_Novedad Tipos_Novedad
on Novedades.idTipo = Tipos_Novedad.id
left join rrhh_masserca_nom Colaborador
on Novedades.idPropietario = Colaborador.NoIdentificacion
left join rrhh_masserca_Estados_de_Novedad Estado
on Novedades.idEstado = Estado.id


select Incapacidad
from string_split(,',')

/*
*/

select Agente.*
from rrhh_masserca_nom Agente
left join (
select Tipo.* 
from rrhh_masserca_Tipos_de_Novedad Tipo
left join rrhh_masserca_Novedades Novedades
on Tipo.id = Novedades.idTipo
) tipo on tipo.idAprobacion = Agente.NoIdentificacion
 


/****/
select Novedades.fechaDeCreacion as "fechaDeCreacion" ,Novedades.id as "id", tipo.nombre as "tipo",
tipo.aprobacion as "aprobacion", Colaborador.Nombres as  "solicitante", Colaborador.Email as  "emailSolicitante", Colaborador.Cargo as "cargoSolicitante", Colaborador.NoIdentificacion as "cedulaSolicitante",
tipo.nombre as "nombreAsignadoA", tipo.email as "emailAsignadoA", Aprobacion.Email as "aprobadoPor", Novedades.descripcion as "descripcion", Novedades.adjuntos "adjuntos"
from rrhh_masserca_Novedades Novedades
left join (
	select Tipo.*, Agente.email
	from rrhh_masserca_Tipos_de_Novedad Tipo
	left join rrhh_masserca_Agentes Agente
	on Tipo.idAsignarA = Agente.id
) tipo 
on tipo.id = Novedades.idTipo
left join rrhh_masserca_nom Colaborador
on Colaborador.NoIdentificacion = Novedades.idPropietario
left join (
	select Tipo.*, Agente.email
	from rrhh_masserca_Tipos_de_Novedad Tipo
	left join rrhh_masserca_Agentes Agente
	on Tipo.idAprobacion = Agente.id
) Aprobacion
on Aprobacion.id = Novedades.idTipo
where Novedades.id = 11

/*
*/




select * from rrhh_masserca_Estados_de_Novedad
where id = 0


select Aprobacion.nombre as "tipo", Aprobacion.Nombres as "aprobadoPor", Novedad.fechaDeCreacion, Agente.nombre as "asignadoA", Colaborador.Nombres, Colaborador.NoIdentificacion, Colaborador.Cargo
from rrhh_masserca_Novedades Novedad
left join (
	select Tipo.*, Agente.Nombres 
	from rrhh_masserca_nom Agente
	left join rrhh_masserca_Tipos_de_Novedad Tipo 
	on Tipo.idAprobacion = Agente.NoIdentificacion
) Aprobacion 
on Aprobacion.id = Novedad.idTipo
left join rrhh_masserca_Agentes Agente
on Agente.id = Novedad.idAsignadoA
left join rrhh_masserca_nom Colaborador
on Colaborador.NoIdentificacion = Novedad.idPropietario




select * from Sat_Dependencias_Agentes where GdA_Agente_Nombre like '%alvaro s%'

select * from rrhh_masserca_nom where Cargo like '%calidad%'
 

select * from Sat_Dependencias_Agentes