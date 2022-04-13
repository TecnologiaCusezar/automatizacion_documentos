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
//sendRequest("POST", "https://prod-128.westus.logic.azure.com:443/workflows/c8ff544bc86f4248a264d56c54c5c34b/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=S29fMq5eWjqhxX0zT4g7OJYkmwKDgfeiApuOYVwPn20", "example");

//Prueba Azure Functions

sendPlainRequest("POST", "https://cusezarfunctions.azurewebsites.net/api/JSReturner?code=eiYzPf1hA2ZFFlqL8VL7MBu9nr0ykpUCauVefJYVmTqjsifSC8yRXg==", `
let json = JSON.parse('[{"attributes": {"type": "PricebookEntry","url": "/services/data/v52.0/sobjects/PricebookEntry/01u4W00000C0OKUQA3"},"Name": "GRJC-189","UnitPrice": 20000000   },   {       "attributes": {           "type": "PricebookEntry",           "url": "/services/data/v52.0/sobjects/PricebookEntry/01u4W00000C0OKVQA3"       },       "Name": "DEP-212",       "UnitPrice": 0    },    {        "attributes": {           "type": "PricebookEntry",            "url": "/services/data/v52.0/sobjects/PricebookEntry/01u4W00000C0OJgQAN"        },        "Name": "APT-002-1608",        "UnitPrice": 344560000    }]');
    let respuesta = {
        garajes: [],
        dep_sitos: []
    };
    let unidades = [

    ];
    let garajes = [

    ];
    let dep_sitos = [

    ];
    json.forEach(e => {
        let unit = e.Name.split('-');
        if (e.Name.includes('GR')) {
            respuesta.garajes.push({
                c_digo: unit[1],
                descripci_n: '',
                tipo: '',
                valor: e.UnitPrice
            });
        } else if (e.Name.includes('DEP')) {
            respuesta.dep_sitos.push({
                c_digo: unit[1],
                descripci_n: '',
                tipo: '',
                valor: e.UnitPrice
            });
        }
    });
    return JSON.stringify(respuesta);
`);


//let json_cliente = require('./autorizacion_centrales.json');

function azureFunc() {
    let json = JSON.parse('[{"attributes": {"type": "PricebookEntry","url": "/services/data/v52.0/sobjects/PricebookEntry/01u4W00000C0OKUQA3"},"Name": "GRJC-189","UnitPrice": 20000000   },   {       "attributes": {           "type": "PricebookEntry",           "url": "/services/data/v52.0/sobjects/PricebookEntry/01u4W00000C0OKVQA3"       },       "Name": "DEP-212",       "UnitPrice": 0    },    {        "attributes": {           "type": "PricebookEntry",            "url": "/services/data/v52.0/sobjects/PricebookEntry/01u4W00000C0OJgQAN"        },        "Name": "APT-002-1608",        "UnitPrice": 344560000    }]');
    let respuesta = {
        garajes: [],
        dep_sitos: []
    }
    let unidades = [

    ];
    let garajes = [

    ];
    let dep_sitos = [

    ];
    json.forEach(e => {
        let unit = e.Name.split('-');
        if (e.Name.includes('GR')) {
            respuesta.garajes.push({
                c_digo: unit[1],
                descripci_n: '',
                tipo: '',
                valor: e.UnitPrice
            });
        } else if (e.Name.includes('DEP')) {
            respuesta.dep_sitos.push({
                c_digo: unit[1],
                descripci_n: '',
                tipo: '',
                valor: e.UnitPrice
            });
        }
    });
    return JSON.stringify(respuesta);
}


// console.log(azureFunc());

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
