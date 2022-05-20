select Incapacidades.fechaDeCreacion as "Fecha de creación", Incapacidades.id as "Id", Agente.nombre as "Asignado A", Incapacidades.codigoIncapacidad as "Código diagnóstico", Incapacidades.idDiagnostico as "Código Incapacidad",
Incapacidades.adjuntosIncapacidad as "Adjuntos" ,Eps.RazonSocial as "Eps", Incapacidades.fechaDeInicio as "Fecha de Inicio", Incapacidades.fechaDeFin as "Fecha de Fin",
Colaborador.NoIdentificacion as "Cédula Propietario", Colaborador.Nombres as "Nombre propietario"
from rrhh_masserca_Incapacidades Incapacidades
left join rrhh_masserca_Agentes Agente
on Incapacidades.idAsignadoA = Agente.id
left join rrhh_masserca_Codigos_EPS Eps
on Incapacidades.idEps = Eps.Id
left join rrhh_masserca_nom Colaborador
on Incapacidades.idPropietario = Colaborador.NoIdentificacion
left join rrhh_masserca_Estados_de_Novedad Estado
on Incapacidades.idEstado = Estado.id