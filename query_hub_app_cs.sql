SELECT a.GdA_Id, a.GdA_Agente_Nombre,a_1.GdA_Agente_Nombre AS "GdA_Dependencia1",a_2.GdA_Agente_Nombre AS "GdA_Dependencia2",a_3.GdA_Agente_Nombre AS "GdA_Dependencia3",a_4.GdA_Agente_Nombre AS "GdA_Dependencia4", b.GdA_Agente_Nombre AS "GdA_Vacaciones_Dependencia1", c.GdA_Agente_Nombre AS "GdA_Vacaciones_Dependencia2"
FROM Sat_dependencias_Agentes a
LEFT JOIN Sat_dependencias_Agentes a_1
ON a.GdA_Dependencia1 =a_1.GdA_Id
LEFT JOIN Sat_dependencias_Agentes a_2
ON a.GdA_Dependencia2 =a_2.GdA_Id
LEFT JOIN Sat_dependencias_Agentes a_3
ON a.GdA_Dependencia3 =a_3.GdA_Id
LEFT JOIN Sat_dependencias_Agentes a_4
ON a.GdA_Dependencia4 =a_4.GdA_Id
LEFT JOIN Sat_dependencias_Agentes b
ON a.GdA_Vacaciones_Dependencia1 =b.GdA_Id
Left JOIN Sat_dependencias_Agentes c
ON a.GdA_Vacaciones_Dependencia2 =c.GdA_Id
WHERE (a.GdA_Agente_Nombre LIKE '%%' AND a.GdA_Activo = 1 AND
a.GdA_EsGrupo = 0) ORDER BY a.GdA_Agente_Nombre

SELECT * From Sat_dependencias_Agentes where GdA_Agente_Nombre LIKe '%%' AND GdA_Activo = 1 AND GdA_EsGrupo = 0 ORDER BY GdA_Agente_Nombre
