SELECT a.GdA_Agente_Nombre,b.GdA_Agente_Nombre AS "GdA_Vacaciones_Dependencia1", c.GdA_Agente_Nombre AS "GdA_Vacaciones_Dependencia2"
FROM Sat_dependencias_Agentes a, Sat_dependencias_Agentes b, Sat_dependencias_Agentes c
WHERE 
a.GdA_Vacaciones_Dependencia1 =b.GdA_Id AND
a.GdA_Vacaciones_Dependencia2 = c.GdA_Id 

SELECT a.GdA_Agente_Nombre,b.GdA_Agente_Nombre AS "GdA_Vacaciones_Dependencia1", a.GdA_Agente_Nombre AS "GdA_Vacaciones_Dependencia2"
FROM Sat_dependencias_Agentes a
LEFT JOIN Sat_dependencias_Agentes b
ON a.GdA_Vacaciones_Dependencia1 =b.GdA_Id
WHERE (a.GdA_Agente_Nombre LIKE '%roa%' AND a.GdA_Activo = 1 AND
a.GdA_EsGrupo = 0)


SELECT a.GdA_Agente_Nombre,b.GdA_Agente_Nombre AS "GdA_Vacaciones_Dependencia1", c.GdA_Agente_Nombre AS "GdA_Vacaciones_Dependencia2"
FROM Sat_dependencias_Agentes a
LEFT JOIN Sat_dependencias_Agentes b
ON a.GdA_Vacaciones_Dependencia1 =b.GdA_Id
Left JOIN Sat_dependencias_Agentes c
ON a.GdA_Vacaciones_Dependencia2 =c.GdA_Id
WHERE (a.GdA_Agente_Nombre LIKE '%juan pablo%' AND a.GdA_Activo = 1 AND
a.GdA_EsGrupo = 0)

SELECT * From Sat_dependencias_Agentes where GdA_Agente_Nombre LiKE '%ardona%'

SELECT count( * ) as  total_record From Sat_dependencias_Agentes

SELECT * From Sat_dependencias_Agentes
where GdA_Agente_Nombre LIKE '%juan%' AND GdA_Activo = 1 AND GdA_EsGrupo = 0