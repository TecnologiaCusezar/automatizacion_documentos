import JsonDocPopulator from './jsondocpopulatorfx.js';
import http from 'http';
import fs from 'fs';
import renderjson from 'renderjson';

let json = JSON.parse(fs.readFileSync("./boletin_ventas.json"));
let populator = new JsonDocPopulator();
let cliente = populator.getAttributes("triggerBody()", json);
//fs.writeFileSync('./boletin_completer.json', JSON.stringify(cliente), 'utf-8');
//console.log("El archivo boletin_completer.json ha sido actualizado !");
console.log('\n');
console.log(populator.getByTrace(cliente,"proyecto>unidad>financiaci_n>plan_de_pagos>20>fecha>0"));
// console.log(populator.getByTrace(cliente,"proyecto>unidad>financiaci_n>plan_de_pagos>20>concepto>0"));
// console.log(populator.getByTrace(cliente,"proyecto>unidad>financiaci_n>plan_de_pagos>20>valor"));
// console.log(populator.getByTrace(cliente,"compradores>2>ciudad_de_residencia>0"));




/*
// Create a server object:
const server = http.createServer(function (req, res) {
    res.setHeader('Content-Type','text/html');
    let html = `<!DOCTYPE html><html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Arbol</title>
        <script src="https://cdn.rawgit.com/caldwell/renderjson/master/renderjson.js"></script>
    </head>
    
    <body>
        <div id="container"></div>
        <script>
            let data = \`${JSON.stringify(cliente)}\`;
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

*/
