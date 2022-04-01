import JsonDocPopulator from './jsondocpopulatorfx.js';
import http from 'http';
import fs from 'fs';
import renderjson from 'renderjson';
import fetch from 'node-fetch';
import url from 'url-parse';

function sendRequest(method = "POST", link, json) {
    try {
        const json_ = json;
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

function deploy() {
    // Create a server object:
    const server = http.createServer(function (req, res) {
        res.setHeader('Content-Type', 'text/html');
        let html = `<!DOCTYPE html><html lang="en">

<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Arbol</title>
<script src="https://cdn.rawgit.com/caldwell/renderjson/master/renderjson.js"></script>
</head>

<body>
<div style="width: 500px; word-wrap: normal;" id="container"></div>
<script>
    let data = \`${JSON.stringify(json)}\`;
    let xml = new XMLHttpRequest();
    xml.open("POST", window.location.href);
    xml.onreadystatechange = () => {
        if (xml.readyState == 4) {
            data = xml.responseText;
        }
    }
    xml.send();
    document.getElementById("container").appendChild(renderjson(JSON.parse(data)));
</script>
</body>

</html>`;
        res.write(html);
        res.end();
    }).listen(7900, function (error) {
        // Checking any error occur while listening on port
        if (error) {
            console.log('Something went wrong', error);
        } else {
            console.log('Servidor inicializado');
        }
    })
}
/*
let json = JSON.parse(fs.readFileSync("./boletin_ventas.json"));
json.proyecto.unidad.financiaci_n.plazo = 50;

for (let i = 35; i < 50; i++) {
    let newCuote = JSON.parse(`{
        "concepto": "Cuota",
        "fecha": "2024-08-26",
        "valor": 50,
        "periodo": "${i - 1}",
        "entidad": "",
        "amortizaci_n": "",
        "plazo": 0
    }`);
    json.proyecto.unidad.financiaci_n.plan_de_pagos[i] = newCuote;
}
json.proyecto.unidad.financiaci_n.plan_de_pagos.forEach(element => {
    if (element.fecha === '') {
        element.fecha = '    -  -  ';
    }
});
//console.log('\n');
//console.log('\n');
//console.log(JSON.stringify(json));
//console.log('\n');
//console.log('\n');
//let populator = new JsonDocPopulator();
//let cliente = populator.getAttributes("triggerBody()", json, true);
//sendRequest("POST", "https://prod-190.westus.logic.azure.com:443/workflows/82dfae4590034ed992a3d56aad858ad4/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=mMgvmHQHf3S0XxqFhggEyqyIL-oXJkj6WfyuNrlwSmQ", JSON.stringify(json));

*/


function azure() {

    let json = JSON.parse('');
    let ingresos_total_mensual = 0;

    json.compradores.forEach(comprador => {
        comprador.informacion_financiera.ingresos.forEach(ingreso => {
            ingresos_total_mensual += ingreso.total;
        });
    });

    return ingresos_total_mensual;



    /*
    let json = JSON.parse('');
    let conceptos_cuota_inicial = [
        'AFC',
        'Cesantias',
        'Cuota',
        'Fondo Pensiones Voluntarias',
        'Otras cesantias',
        'Otros AFC',
        'Reforma Escriturable',
        'Reformas',
        'Separación',
        'Ultimo Pago'
    ];
    let conceptos_escrituracion = [
        'Ahorro Prog',
        'C:CreditoTer',
        'Subsidio'
    ];
    let cuotas = {
        ingresos: 0,
        concepto: ''
    };
    let escrituracion = {
        ingresos: 0,
        concepto: '',
        entidad: ''
    };
    let subsidio = {
        ingresos: 0,
        concepto: '',
        entidad: ''
    };
    let credito = {
        ingresos: 0,
        concepto: '',
        entidad: ''
    };

    json.proyecto.unidad.financiaci_n.plan_de_pagos.forEach(cuota => {
        if (conceptos_cuota_inicial.indexOf(cuota.concepto) != -1) {
            cuotas.ingresos += cuota.valor;
        } else if (conceptos_escrituracion.indexOf(cuota.concepto) != -1) {
            if (conceptos_escrituracion.indexOf(cuota.concepto) == 1) {
                credito.ingresos += cuota.valor;
                credito.concepto = 'Crédito hipotecario';
                credito.entidad = cuota.entidad;
            } else if (conceptos_escrituracion.indexOf(cuota.concepto) == 2) {
                subsidio.ingresos += cuota.valor;
                subsidio.concepto = cuota.concepto;
                subsidio.entidad = cuota.entidad;
            } else {
                escrituracion.ingresos += cuota.valor;
                escrituracion.concepto = cuota.concepto;
                escrituracion.entidad = cuota.entidad;
            }
        }
    });

    let conceptos = [
        escrituracion,
        subsidio,
        credito
    ];
    conceptos.sort(function (a, b) {
        return b.ingresos - a.ingresos;
    });
    let saldos = [];
    conceptos.forEach(element => {
        saldos.push({
            concepto: element.concepto,
            valor: element.ingresos,
            entidad: element.entidad
        });
    });

    saldos.push({
        concepto: 'Cuota Inicial',
        valor: cuotas.ingresos,
        entidad: ''
    });

    return saldos;
    let json = JSON.parse(fs.readFileSync("./boletin_ventas.json"));
    let conceptos_cuota_inicial = [
        'AFC',
        'Cesantias',
        'Cuota',
        'Fondo Pensiones Voluntarias',
        'Otras cesantias',
        'Otros AFC',
        'Reforma Escriturable',
        'Reformas',
        'Separación',
        'Ultimo Pago'
    ];
    let conceptos_escrituracion = [
        'Ahorro Prog',
        'C:CreditoTer',
        'Subsidio'
    ];
    let cuotas = {
        ingresos: 0,
        concepto: ''
    };
    let escrituracion = {
        ingresos: 0,
        concepto: '',
        entidad: ''
    };
    let subsidio = {
        ingresos: 0,
        concepto: '',
        entidad: ''
    };
    let credito = {
        ingresos: 0,
        concepto: '',
        entidad: ''
    };

    json.proyecto.unidad.financiaci_n.plan_de_pagos.forEach(cuota => {
        if (conceptos_cuota_inicial.indexOf(cuota.concepto) != -1) {
            cuotas.ingresos += cuota.valor;
        } else if (conceptos_escrituracion.indexOf(cuota.concepto) != -1) {
            if (conceptos_escrituracion.indexOf(cuota.concepto) == 1) {
                credito.ingresos += cuota.valor;
                // credito.concepto = cuota.concepto;
                credito.concepto = 'Crédito hipotecario';
                credito.entidad = cuota.entidad;
            } else if (conceptos_escrituracion.indexOf(cuota.concepto) == 2) {
                subsidio.ingresos += cuota.valor;
                subsidio.concepto = cuota.concepto;
                subsidio.entidad = cuota.entidad;
            } else {
                escrituracion.ingresos += cuota.valor;
                escrituracion.concepto = cuota.concepto;
                escrituracion.entidad = cuota.entidad;
            }
        }
    });

    let conceptos = [
        escrituracion,
        subsidio,
        credito
    ];

    conceptos.sort(function (a, b) {
        return b.ingresos - a.ingresos;
    });

    let saldos = [];
    conceptos.forEach(element => {
        saldos.push({
            concepto: element.concepto,
            valor: element.ingresos,
            entidad: element.entidad
        });
    });

    saldos.push({
        concepto: 'Cuota Inicial',
        valor: cuotas.ingresos,
        entidad: ''
    });

    return saldos;

    // @{if(equals(outputs('Valor_Apto_y_Garajes')?[0],null),' ',formatNumber(outputs('Valor_Apto_y_Garajes')?[0],'0,0'))}

*/

}
console.log(azure());