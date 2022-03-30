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

let json = JSON.parse(fs.readFileSync("./boletin_ventas.json"));
let newCuote = JSON.parse(`{
    "concepto": "Cuota",
    "fecha": "2024-08-26",
    "valor": 50,
    "periodo": "",
    "entidad": "",
    "amortizaci_n": "",
    "plazo": 0
}`);

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
let populator = new JsonDocPopulator();
let cliente = populator.getAttributes("triggerBody()", json);
//sendRequest("POST", "https://prod-190.westus.logic.azure.com:443/workflows/82dfae4590034ed992a3d56aad858ad4/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=mMgvmHQHf3S0XxqFhggEyqyIL-oXJkj6WfyuNrlwSmQ", JSON.stringify(json));

//fs.writeFileSync('./boletin_completer.json', JSON.stringify(cliente), 'utf-8');
//console.log("El archivo boletin_completer.json ha sido actualizado !");
//console.log('\n');
//console.log('\n');
//console.log(populator.getByTrace(cliente, "proyecto>unidad>financiaci_n>plan_de_pagos>20>fecha"));
// console.log(populator.getByTrace(cliente,"proyecto>unidad>financiaci_n>plan_de_pagos>20>concepto>0"));
// console.log(populator.getByTrace(cliente,"proyecto>unidad>financiaci_n>plan_de_pagos>20>valor"));
// console.log(populator.getByTrace(cliente,"compradores>2>ciudad_de_residencia>0"));

import { XMLParser, XMLBuilder, XMLValidator } from 'fast-xml-parser';

const parser = new XMLParser();
let jObj = parser.parse(fs.readFileSync("./freeformatter-out.xml"));

const builder = new XMLBuilder();
const xmlContent = builder.build(jObj);

console.log(jObj);











let traceArray = process.argv.slice(2);
if (traceArray.length > 0) {
    if (traceArray[0].toLowerCase() === 'serve') {
        deploy();
    } else {
        throw new Error("Debe especificar la acción de traza");
    }
}


