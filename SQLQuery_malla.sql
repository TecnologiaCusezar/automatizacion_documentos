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

select GdA_Id as "Id", null as "IdProyecto", GdA_Agente_Nombre as "Nombre", GdA_Agente_Email as "Email"  into Comercial_Malla_Asesor 
from Sat_dependencias_Agentes Sat 
left join 
on 

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