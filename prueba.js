import fetch from 'node-fetch';
import url from 'url-parse';
import fs from 'fs';

function sendRequest(method = "POST", link, json) {
    try {
        const json_ = JSON.parse(fs.readFileSync(`./${json}.json`));
        let miliSegundos = 0;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(json_),
        };
        let hostname = url(link).hostname;
        console.log("\nSolicitud enviada a " + hostname + "...\n");
        let status = null;
        fetch(link, options).then((res) => { status = res.status; return res.json() }).then((res) => {
            let mainHeader = "[" + new Date().toUTCString() + "] SERVER " + hostname;
            let messagebody = "Status: " + status + " \nDetalles: \n" + JSON.stringify(res) + "\n .endPoint \nTime: " + (miliSegundos / 60000).toFixed(3) + " min (" + (miliSegundos / 1000).toFixed(3) + " s / " + miliSegundos + " ms)";
            if (res.ok) {
                console.log(mainHeader + " : Éxito!: " + messagebody);
            } else {
                console.log(mainHeader + " : Error!: " + messagebody);
            }
            clearInterval(temporizador);
        });
        let temporizador = setInterval(function () {
            miliSegundos++;
        }, 1);
    } catch (error) {
        console.log("Error!: " + error);
    }
}

function sendPlainRequest(method = "POST", link, json) {
    try {
        let miliSegundos = 0;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(json),
        };
        let hostname = url(link).hostname;
        console.log("\nSolicitud enviada a " + hostname + "...\n");
        let status = null;
        fetch(link, options).then((res) => { status = res.status; return res.json() }).then((res) => {
            let mainHeader = "[" + new Date().toUTCString() + "] SERVER " + hostname;
            let messagebody = "Status: " + status + " \nDetalles: \n" + JSON.stringify(res) + "\n .endPoint \nTime: " + (miliSegundos / 60000).toFixed(3) + " min (" + (miliSegundos / 1000).toFixed(3) + " s / " + miliSegundos + " ms)";
            if (res.ok) {
                console.log(mainHeader + " : Éxito!: " + messagebody);
            } else {
                console.log(mainHeader + " : Error!: " + messagebody);
            }
            clearInterval(temporizador);
        });
        let temporizador = setInterval(function () {
            miliSegundos++;
        }, 1);
    } catch (error) {
        console.log("Error!: " + error);
    }
}

//Prueba Salesforce HTTP Requester
// sendRequest("POST","https://prod-22.westus.logic.azure.com:443/workflows/623a821225cf4d2b9e984e8d2f7ea5b8/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=1TkPdu1nbcf3_Rwv0gsCZ9cpdTs94KNKwZp3GFVUjdc","example");

//Prueba Autorización centrales
// sendRequest("POST", "https://prod-91.westus.logic.azure.com:443/workflows/33f4fcf6b6c24d0ca393aab34b89cf5c/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Psa2H_3VV52p_3N5CkMWtDacg-THi7HjzOVSPkYfzd8", "example");

//Prueba Indagación estado civil
// sendRequest("POST","https://prod-150.westus.logic.azure.com:443/workflows/d8f2433c8291427991fac9cc2238af73/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=dOlgsLAegH8rIIpXDJUu_RMhV0ePwzF_mImkR61U1ws","example");

//Prueba Conocimiento al cliente
// sendRequest("POST","https://prod-95.westus.logic.azure.com:443/workflows/b5917db857b34868a1b3a47af4a5e4d1/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Zpckx4oSlzr4TtBR6bgsSiKYb4QlHgW8P20MlIob0zA","example");

//Prueba Boletín de ventas JS
sendRequest("POST", "https://prod-128.westus.logic.azure.com:443/workflows/c8ff544bc86f4248a264d56c54c5c34b/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=S29fMq5eWjqhxX0zT4g7OJYkmwKDgfeiApuOYVwPn20", "example");

//Prueba Azure Functions
/*
sendPlainRequest("POST", "https://cusezarfunctions.azurewebsites.net/api/JSReturner?code=eiYzPf1hA2ZFFlqL8VL7MBu9nr0ykpUCauVefJYVmTqjsifSC8yRXg==", `
let json = JSON.parse('{"proyecto":{"macroproyecto":"LUAR","sociedad_vendedora":"asd","equipo_comercial":[{"nombre":"asd","cargo":"jefe"},{"nombre":"asd","cargo":"asesor"},{"nombre":"asd","cargo":"promotor"},{"nombre":"asd","cargo":"promotor"},{"nombre":"asd","cargo":"promotor"}],"tel_fono":"asd","unidad":{"id":"APT-003-0608","torre":"003","unidad":"0608","area":{"construidos":34,"privados":29.48,"balc_n":5.6,"terraza":2.4,"patio":8.9},"financiaci_n":{"valor":317220000,"plan_de_pagos":[{"concepto":"Separación","fecha":"2022-04-25","valor":15000000,"periodo":"0","entidad":"","amortizaci_n":"","plazo":0},{"concepto":"Cuota","fecha":"2022-05-25","valor":1665644,"periodo":"1","entidad":"","amortizaci_n":"","plazo":0},{"concepto":"Cuota","fecha":"2022-06-27","valor":3665644,"periodo":"2","entidad":"","amortizaci_n":"","plazo":0},{"concepto":"Cuota","fecha":"2022-07-25","valor":1665644,"periodo":"3","entidad":"","amortizaci_n":"","plazo":0},{"concepto":"Cuota","fecha":"2022-08-25","valor":1665644,"periodo":"4","entidad":"","amortizaci_n":"","plazo":0},{"concepto":"Cuota","fecha":"2022-09-26","valor":1665644,"periodo":"5","entidad":"","amortizaci_n":"","plazo":0},{"concepto":"Cuota","fecha":"2022-10-25","valor":1665644,"periodo":"6","entidad":"","amortizaci_n":"","plazo":0},{"concepto":"Cuota","fecha":"2022-11-25","valor":1665644,"periodo":"7","entidad":"","amortizaci_n":"","plazo":0},{"concepto":"Cuota","fecha":"2022-12-26","valor":3665644,"periodo":"8","entidad":"","amortizaci_n":"","plazo":0},{"concepto":"Cuota","fecha":"2023-01-25","valor":1665644,"periodo":"9","entidad":"","amortizaci_n":"","plazo":0},{"concepto":"Cesantias","fecha":"2023-02-27","valor":6065644,"periodo":"10","entidad":"","amortizaci_n":"","plazo":0},{"concepto":"Cuota","fecha":"2023-03-27","valor":1665644,"periodo":"11","entidad":"","amortizaci_n":"","plazo":0},{"concepto":"Cuota","fecha":"2023-04-25","valor":1665644,"periodo":"12","entidad":"","amortizaci_n":"","plazo":0},{"concepto":"Cuota","fecha":"2023-05-25","valor":1665644,"periodo":"13","entidad":"","amortizaci_n":"","plazo":0},{"concepto":"Cuota","fecha":"2023-06-26","valor":3665644,"periodo":"14","entidad":"","amortizaci_n":"","plazo":0},{"concepto":"Cuota","fecha":"2023-07-25","valor":1665644,"periodo":"15","entidad":"","amortizaci_n":"","plazo":0},{"concepto":"Cuota","fecha":"2023-08-25","valor":1665644,"periodo":"16","entidad":"","amortizaci_n":"","plazo":0},{"concepto":"Cuota","fecha":"2023-09-25","valor":1665644,"periodo":"17","entidad":"","amortizaci_n":"","plazo":0},{"concepto":"Cuota","fecha":"2023-10-25","valor":1665644,"periodo":"18","entidad":"","amortizaci_n":"","plazo":0},{"concepto":"Cuota","fecha":"2023-11-27","valor":1665644,"periodo":"19","entidad":"","amortizaci_n":"","plazo":0},{"concepto":"Cuota","fecha":"2023-12-25","valor":3665644,"periodo":"20","entidad":"","amortizaci_n":"","plazo":0},{"concepto":"Cuota","fecha":"2024-01-25","valor":1665644,"periodo":"21","entidad":"","amortizaci_n":"","plazo":0},{"concepto":"Cesantias","fecha":"2024-02-26","valor":6065644,"periodo":"22","entidad":"","amortizaci_n":"","plazo":0},{"concepto":"Cuota","fecha":"2024-03-25","valor":1665644,"periodo":"23","entidad":"","amortizaci_n":"","plazo":0},{"concepto":"Cuota","fecha":"2024-04-25","valor":1665644,"periodo":"24","entidad":"","amortizaci_n":"","plazo":0},{"concepto":"Cuota","fecha":"2024-05-27","valor":1665644,"periodo":"25","entidad":"","amortizaci_n":"","plazo":0},{"concepto":"Cuota","fecha":"2024-06-25","valor":3665644,"periodo":"26","entidad":"","amortizaci_n":"","plazo":0},{"concepto":"Cuota","fecha":"2024-07-25","valor":1665644,"periodo":"27","entidad":"","amortizaci_n":"","plazo":0},{"concepto":"Cuota","fecha":"2024-08-26","valor":1665644,"periodo":"28","entidad":"","amortizaci_n":"","plazo":0},{"concepto":"Cuota","fecha":"2024-09-25","valor":1665644,"periodo":"29","entidad":"","amortizaci_n":"","plazo":0},{"concepto":"Cuota","fecha":"2024-10-25","valor":1665644,"periodo":"30","entidad":"","amortizaci_n":"","plazo":0},{"concepto":"Cuota","fecha":"2024-11-25","valor":1665644,"periodo":"31","entidad":"","amortizaci_n":"","plazo":0},{"concepto":"Cuota","fecha":"2024-12-25","valor":3665644,"periodo":"32","entidad":"","amortizaci_n":"","plazo":0},{"concepto":"Cesantias","fecha":"2025-01-27","valor":6065392,"periodo":"33","entidad":"","amortizaci_n":"","plazo":0},{"concepto":"C:CreditoTer","fecha":"2025-02-25","valor":222054000,"periodo":"34","entidad":"asd","amortizaci_n":"Pesos","plazo":0}],"plazo":33,"descuento_comercial":0,"descuento_financiero":0,"costo_financiero":0},"garajes":[{"c_digo":"asd","descripci_n":"Semi-descubierto","tipo":"Sencillo"},{"c_digo":"","descripci_n":"","tipo":""},{"c_digo":"","descripci_n":"","tipo":""},{"c_digo":"","descripci_n":"","tipo":""},{"c_digo":"","descripci_n":"","tipo":""}],"dep_sitos":[{"c_digo":"asd","descripci_n":"En sótano","piso":""},{"c_digo":"","descripci_n":"En sótano","piso":""}],"mes_estimado_entrega":"","torre_hace_parte_cerramiento":true,"exterior":true,"interior":false,"medianero":true,"esquinero":false,"observaciones":"","obra":"asd"},"coeficiente_administraci_n":2800,"email":"asd","direcci_n":"asd","ciudad":"asd","nombre_asesor":"asd","identificaci_n_asesor":"asd","cargo_asesor":"asd"},"compradores":[{"nombre":"MARIA","primer_apellido":"PARRA","segundo_apellido":"","tipo_documento":"Cédula de ciudadanía","n_mero_documento":"1014285314","fecha_expedici_n":"05/08/2020","lugar_expedici_n":"BOGOTA D.C","fecha_nacimiento":"1997-01-31","lugar_nacimiento":"asd","nacionalidad":"asd","estado_civil":"SO","sexo":"F","c_nyugue":{"nombres":" ","apellidos":" ","n_mero_documento":"","a_os_de_convivencia":"","fecha_de_liquidaci_n_de_sociedad":"","n_mero_de_notar_a_o_juzgado":"","n_mero_de_escritura":""},"correo_electr_nico":"alejandraparradiaz04@gmail.com","n_mero_de_celular":"3160233984","n_mero_de_tel_fono":"","direcci_n_de_residencia":"","ciudad_de_residencia":"","pa_s_de_residencia":"","informacion_financiera":{"ingresos":[{"actividad":"","c_digo_ciiu":"asd","ocupaci_n":"asd","cargo":"asd","total":0,"empresa":{"nombre":"SAP  COLOMBIA S.A.S.","tel_fono":"6003000","direcci_n":"asd","telefono":"asd"},"_p_que_tipo_de_producto_y_o_servicio_comercializa":"asd","cesantias":"","entidad":""},{"actividad":"","c_digo_ciiu":"","ocupaci_n":"","cargo":"","total":0,"empresa":{"nombre":"","tel_fono":"","direcci_n":""},"_p_que_tipo_de_producto_y_o_servicio_comercializa":"","cesantias":"","entidad":""}],"cifin":0,"aporte_por_primas":0,"ahorros":0,"gastos_personales":0,"aportes":"","subsidio":{"entidad":"","valor":0},"activo":"50000","pasivo":"10000"},"informacion_pep":{"_p_por_su_actividad_o_cargo_maneja_recursos p_blicos":false,"_p_por_su_actividad_u_oficio_goza_usted_de_reconocimiento_p_blico_general":false,"_p_por_su_actividad_o_cargo_ejerce_alg_n_grado_de_poder_p_blico":"","_p_existe_alg_n_v_nculo_entre_usted_y_una_persona_considerada_p_blicamente_expuesta":"","_p_es_usted_sujeto_de_obligaciones_tributarias_en_otros_pa_ses_o_grupo_de_pa_ses":"","nombre_gerente_comercial":"","n_mero_documento_gerente_comercial":"","nombre_oficial_cumplimiento":"","n_mero_documento_oficial_cumplimiento":"","_p_por_su_actividad_o_cargo_maneja_recursos_p_blicos":false},"origen_de_fondos":"De mi actividad como ","acepta_campa_as_de_promoci_n_de_proyectos":true,"acepta_estudios_estad_sticos_del_cliente":true},{"nombre":"CARLOS EDUARDO","tipo":"Aportante Solidario","primer_apellido":"PARRA","segundo_apellido":"CAMACHO","tipo_documento":"Cédula de ciudadanía","n_mero_documento":"79654513","fecha_expedici_n":"05/06/2020","lugar_expedici_n":"BOGOTA D.C","fecha_nacimiento":"1973-05-04","lugar_nacimiento":"asd","nacionalidad":"asd","estado_civil":"CV","sexo":"M","c_nyugue":{"nombres":"","apellidos":"","n_mero_documento":"","a_os_de_convivencia":"","fecha_de_liquidaci_n_de_sociedad":"","n_mero_de_notar_a_o_juzgado":"","n_mero_de_escritura":""},"correo_electr_nico":"carlos.parra@melcol.com.co","n_mero_de_celular":"3232202592","n_mero_de_tel_fono":"","direcci_n_de_residencia":"","ciudad_de_residencia":"","pa_s_de_residencia":"","informacion_financiera":{"ingresos":[{"actividad":"Empleado","c_digo_ciiu":"asd","ocupaci_n":"asd","cargo":"asd","total":25556000,"empresa":{"nombre":"","tel_fono":"","direcci_n":"asd","telefono":"asd"},"_p_que_tipo_de_producto_y_o_servicio_comercializa":"asd","cesantias":"","entidad":""},{"actividad":"","c_digo_ciiu":"","ocupaci_n":"","cargo":"","total":0,"empresa":{"nombre":"","tel_fono":"","direcci_n":""},"_p_que_tipo_de_producto_y_o_servicio_comercializa":"","cesantias":"","entidad":""}],"cifin":0,"aporte_por_primas":0,"ahorros":0,"gastos_personales":8000000,"aportes":"","subsidio":{"entidad":"","valor":0},"activo":"50000","pasivo":"20000"},"informacion_pep":{"_p_por_su_actividad_o_cargo_maneja_recursos p_blicos":false,"_p_por_su_actividad_u_oficio_goza_usted_de_reconocimiento_p_blico_general":false,"_p_por_su_actividad_o_cargo_ejerce_alg_n_grado_de_poder_p_blico":"","_p_existe_alg_n_v_nculo_entre_usted_y_una_persona_considerada_p_blicamente_expuesta":"","_p_es_usted_sujeto_de_obligaciones_tributarias_en_otros_pa_ses_o_grupo_de_pa_ses":"","nombre_gerente_comercial":"","n_mero_documento_gerente_comercial":"","nombre_oficial_cumplimiento":"","n_mero_documento_oficial_cumplimiento":"","_p_por_su_actividad_o_cargo_maneja_recursos_p_blicos":false},"origen_de_fondos":"De mi actividad como Empleado","acepta_campa_as_de_promoci_n_de_proyectos":true,"acepta_estudios_estad_sticos_del_cliente":true}]}');
json.compradores = json.compradores.filter(item => (item.tipo != 'Aportante Solidario'));
return JSON.stringify(json)
`);
*/

//let json_cliente = require('./autorizacion_centrales.json');

function azureFunc() {
    let respuesta = {
        entidad: "",
        amortizacion_credito: "",
        plazo_credito: "",
        valor_credito: ""
    };
    let plan_de_pagos = json_cliente.proyecto.unidad.financiaci_n.plan_de_pagos;
    plan_de_pagos.forEach(cuota => {
        if (`${cuota.concepto}` === 'C:CreditoTer') {
            respuesta = {
                entidad: cuota.entidad,
                amortizacion_credito: cuota.amortizaci_n,
                plazo_credito: cuota.plazo,
                valor_credito: cuota.valor
            };
        }
    });
    return JSON.stringify(respuesta);
}


//console.log(azureFunc());

function makePayload(json, properties) {
    Object.keys(json).forEach(function (key_1) {
        if (json[key_1] instanceof object) {

        } else if (json[key_1] instanceof array) {
        } else {
            json[key_1] = properties
        }
    });
    return json;
};
