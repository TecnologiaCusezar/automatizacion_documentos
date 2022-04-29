
select * from Comercial_Malla_Asesor where Nombre like '%oscar%'
drop table Comercial_Malla_Descansos
CREATE TABLE Comercial_Malla_Descansos (
    Id int IDENTITY(1,1) PRIMARY KEY,
    IdPropietario int not null,
    Fecha date default CURRENT_TIMESTAMP,
    FechaCreacion datetime default CURRENT_TIMESTAMP,
    EsVacaciones int default 0
);
insert into Comercial_Malla_Descansos (IdPropietario, Fecha) values ('80857794',CONVERT(DATETIME, '2022/05/9'))
insert into Comercial_Malla_Descansos ( IdPropietario, Fecha) values ('80857794',CONVERT(DATETIME, '2022/04/16'))
insert into Comercial_Malla_Descansos ( IdPropietario, Fecha) values ('80857794',CONVERT(DATETIME, '2022/04/17'))
insert into Comercial_Malla_Descansos ( IdPropietario, Fecha) values ('80857794',CONVERT(DATETIME, '2022/04/7'))
insert into Comercial_Malla_Descansos (IdPropietario, Fecha) values ('80857794',CONVERT(DATETIME, '2022/03/29'))
insert into Comercial_Malla_Descansos ( IdPropietario, Fecha) values ('80857794',CONVERT(DATETIME, '2022/04/11'))
insert into Comercial_Malla_Descansos ( IdPropietario, Fecha) values ('80857794',CONVERT(DATETIME, '2022/03/13'))
insert into Comercial_Malla_Descansos ( IdPropietario, Fecha) values ('80857794',CONVERT(DATETIME, '2022/04/22'))
insert into Comercial_Malla_Descansos (IdPropietario, Fecha) values ('80857794',CONVERT(DATETIME, '2022/03/21'))
insert into Comercial_Malla_Descansos ( IdPropietario, Fecha) values ('80857794',CONVERT(DATETIME, '2022/04/02'))
insert into Comercial_Malla_Descansos ( IdPropietario, Fecha) values ('80857794',CONVERT(DATETIME, '2022/04/06'))
insert into Comercial_Malla_Descansos ( IdPropietario, Fecha) values ('80857794',CONVERT(DATETIME, '2022/04/7'))
select * from Comercial_Malla_Descansos order by Fecha
select count(*) from Comercial_Malla_Descansos where Fecha > '2022-03-27'
delete from Comercial_Malla_Descansos where Id <>0