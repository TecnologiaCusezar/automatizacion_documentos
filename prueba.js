let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let URL = require("url").URL;

function sendRequest(method = "POST", link, json) {
    try {
        const json_ = require(`./${(json == null) ? 'default' : json}.json`)
        let xml = new XMLHttpRequest();
        let miliSegundos = 0;
        xml.open(method, link);
        let hostname = new URL(link).host;
        console.log("\nSolicitud enviada a " + hostname + "...\n");
        xml.onreadystatechange = function () {
            if (xml.readyState == 4) {
                let mainHeader = "[" + new Date().toUTCString() + "] SERVER " + hostname;
                if (xml.status >= 200 && xml.status < 300) {
                    console.log(mainHeader + " : Éxito!: Status: " + xml.status + " \nDetalles: " + xml.responseText + " .endPoint \nTime: " + (miliSegundos / 60000).toFixed(3) + " min (" + (miliSegundos / 1000).toFixed(3) + " s / " + miliSegundos + " ms)");
                } else {
                    console.log(mainHeader + " : Error!: Status: " + xml.status + " \nDetalles: " + xml.responseText + " .endPoint \nTime: " + (miliSegundos / 60000).toFixed(3) + " min (" + (miliSegundos / 1000).toFixed(3) + " s / " + miliSegundos + " ms)");
                }
                clearInterval(temporizador);
            }
        };
        xml.setRequestHeader("Content-Type", "application/json");
        xml.send(JSON.stringify(json_));
        let temporizador = setInterval(function () {
            miliSegundos++;
        }, 1);
    } catch (error) {
        console.log("Error!: " + error);
    }
}

//Prueba Salesforce HTTP Requester
//sendRequest("POST","https://prod-22.westus.logic.azure.com:443/workflows/623a821225cf4d2b9e984e8d2f7ea5b8/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=1TkPdu1nbcf3_Rwv0gsCZ9cpdTs94KNKwZp3GFVUjdc","salesforce_requester");

//Prueba Autorización centrales
//sendRequest("POST", "https://prod-91.westus.logic.azure.com:443/workflows/33f4fcf6b6c24d0ca393aab34b89cf5c/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Psa2H_3VV52p_3N5CkMWtDacg-THi7HjzOVSPkYfzd8", "autorizacion_centrales");

//Prueba Indagación estado civil
//sendRequest("POST","https://prod-150.westus.logic.azure.com:443/workflows/d8f2433c8291427991fac9cc2238af73/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=dOlgsLAegH8rIIpXDJUu_RMhV0ePwzF_mImkR61U1ws","autorizacion_centrales");

//Prueba Conocimiento al cliente
//sendRequest("POST", "https://prod-95.westus.logic.azure.com:443/workflows/b5917db857b34868a1b3a47af4a5e4d1/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Zpckx4oSlzr4TtBR6bgsSiKYb4QlHgW8P20MlIob0zA", "autorizacion_centrales");

//Prueba Boletín de ventas
//sendRequest("POST", "https://prod-190.westus.logic.azure.com:443/workflows/82dfae4590034ed992a3d56aad858ad4/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=mMgvmHQHf3S0XxqFhggEyqyIL-oXJkj6WfyuNrlwSmQ", "autorizacion_centrales");

//let json_cliente = require('./autorizacion_centrales.json');

//Prueba dump
//sendRequest("POST", "http://ptsv2.com/t/pfs7c-1648130720/post");

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
    let jsonSchemaGenerator = require('json-schema-generator'),
        obj = { some: { object: true } },
        schemaObj;
    schemaObj = jsonSchemaGenerator(json);
    return schemaObj;
};

//console.log(JSON.stringify(makePayload(require('./autorizacion_centrales.json'))));

function makefile(content = '') {
    let fileName = `ejemplos/schema-${Date.now()}.json`;
    let fs = require('fs');
    fs.writeFile('./' + fileName, content, function (err) {
        if (err) throw err;
        console.log('File ' + fileName + ' was created successfully.');
    });
}

//makefile(JSON.stringify(makePayload(require('./autorizacion_centrales.json'))));
//console.log(JSON.stringify(makePayload(require('./autorizacion_centrales.json'))));

function postMan(method = "POST", link) {
    try {
        let xml = new XMLHttpRequest();
        let miliSegundos = 0;
        xml.open(method, link);
        let hostname = new URL(link).host;
        console.log("\nSolicitud enviada a " + hostname + "...\n");
        xml.onreadystatechange = function () {
            if (xml.readyState == 4) {
                let mainHeader = "[" + new Date().toUTCString() + "] SERVER " + hostname;
                if (xml.status >= 200 && xml.status < 300) {
                    console.log(mainHeader + " : Éxito!: Status: " + xml.status + " \nDetalles: " + xml.responseText + " .endPoint \nTime: " + (miliSegundos / 60000).toFixed(3) + " min (" + (miliSegundos / 1000).toFixed(3) + " s / " + miliSegundos + " ms)");
                } else {
                    console.log(mainHeader + " : Error!: Status: " + xml.status + " \nDetalles: " + xml.responseText + " .endPoint \nTime: " + (miliSegundos / 60000).toFixed(3) + " min (" + (miliSegundos / 1000).toFixed(3) + " s / " + miliSegundos + " ms)");
                }
                clearInterval(temporizador);
            }
        };
        xml.setRequestHeader("Content-Type", "application/json");
        xml.send();
        let temporizador = setInterval(function () {
            miliSegundos++;
        }, 1);
    } catch (error) {
        console.log("Error!: " + error);
    }
}
postMan("POST","https://massercadeti.com/curl/get_redeem/330/1820");

function postMan3(method = "POST", link, json) {
    try {
        let xml = new XMLHttpRequest();
        let miliSegundos = 0;
        xml.open(method, link);
        let hostname = new URL(link).host;
        console.log("\nSolicitud enviada a " + hostname + "...\n");
        xml.onreadystatechange = function () {
            if (xml.readyState == 4) {
                let mainHeader = "[" + new Date().toUTCString() + "] SERVER " + hostname;
                if (xml.status >= 200 && xml.status < 300) {
                    console.log(mainHeader + " : Éxito!: Status: " + xml.status + " \nDetalles: " + xml.responseText + " .endPoint \nTime: " + (miliSegundos / 60000).toFixed(3) + " min (" + (miliSegundos / 1000).toFixed(3) + " s / " + miliSegundos + " ms)");
                } else {
                    console.log(mainHeader + " : Error!: Status: " + xml.status + " \nDetalles: " + xml.responseText + " .endPoint \nTime: " + (miliSegundos / 60000).toFixed(3) + " min (" + (miliSegundos / 1000).toFixed(3) + " s / " + miliSegundos + " ms)");
                }
                clearInterval(temporizador);
            }
        };
        xml.setRequestHeader("Content-Type", "application/json");
        xml.send(json);
        let temporizador = setInterval(function () {
            miliSegundos++;
        }, 1);
    } catch (error) {
        console.log("Error!: " + error);
    }
}
postMan3("POST","https://massercadeti.com/curl/insertProcesoCurl",'');