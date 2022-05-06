insert into rrhh_masserca_Agentes (nombre, email, auth) values ('Big Data', 'bigdata@cusezar.com','x')

update rrhh_masserca_Agentes set id = 1000617084 where email = 'bigdata@cusezar.com'

select * from rrhh_masserca_Incapacidades

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