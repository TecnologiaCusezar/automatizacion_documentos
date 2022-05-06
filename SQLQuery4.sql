select Agente.GdA_Agente_Email as "Email", Dependencia1.GdA_Agente_Email as "Dp_1",Dependencia2.GdA_Agente_Email as "Dp_2",Dependencia3.GdA_Agente_Email as "Dp_3",Dependencia4.GdA_Agente_Email as "Dp_4"
from rrhh_masserca_nom Nom
left join Sat_dependencias_Agentes Agente
on Nom.Email = GdA_Agente_Email
left join Sat_dependencias_Agentes Dependencia1
on Agente.GdA_Dependencia1 = Dependencia1.GdA_Id
left join Sat_dependencias_Agentes Dependencia2
on Agente.GdA_Dependencia2 = Dependencia2.GdA_Id
left join Sat_dependencias_Agentes Dependencia3
on Agente.GdA_Dependencia3 = Dependencia3.GdA_Id
left join Sat_dependencias_Agentes Dependencia4
on Agente.GdA_Dependencia4 = Dependencia4.GdA_Id
where Nom.NoIdentificacion = '1000617084'

select * from Sat_dependencias_Agentes where GdA_Agente_Nombre like '%calderon%'

update Sat_dependencias_Agentes set GdA_Dependencia4 = 31 where GdA_Agente_Email = 'jroa@cusezar.com'

select * from rrhh_masserca_Incapacidades