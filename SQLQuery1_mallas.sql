select Nombres, Cargo, Salario  from rrhh_masserca_nom where Nombres like '%que%' order by Salario;
SELECT * From Sat_dependencias_Agentes where GdA_Agente_Grupo like '%saladeventas%' 
select *  from rrhh_masserca_nom where Cargo like '%asesor%' or Cargo like '%jefe de ventas%' or Cargo like '%promotor%';

CREATE TABLE Comercial_Malla_Descansos (
    Id varchar(15) primary key,
    IdPropietario varchar(15),
    FechaInicio datetime,
    FechaFin datetime,
    EsVacaciones int
);

CREATE TABLE Comercial_Malla_Proyectos (
    Id varchar(15) primary key,
    Nombre varchar(255)
);

select * from Comercial_Malla_Asesor

select nom.NoIdentificacion as "Id", null as "IdProyecto", nom.Nombres as "Nombre", nom.Email as "Email", nom.Cargo as "Cargo" into Comercial_Malla_Asesor 
from  rrhh_masserca_nom nom
where (nom.Cargo like '%asesor%' or nom.Cargo like '%jefe de ventas%' or nom.Cargo like '%promotor%')

select count(*) as "tot" 
from Sat_dependencias_Agentes sat 
left join rrhh_masserca_nom nom
on (nom.Cargo like '%asesor%' or nom.Cargo like '%jefe de ventas%' or nom.Cargo like '%promotor%')

/*
CREATE TABLE Comercial_Malla_Asesor (
    Id varchar(15) primary key,
    IdProyecto varchar(15),
    Nombres varchar(255),
    FechaFin datetime,
    EsVacaciones int
);
*/
drop table Comercial_Malla_Descansos
drop table Comercial_Malla_Asesor