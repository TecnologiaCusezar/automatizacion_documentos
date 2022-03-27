import JsonDocPopulator from './jsondocpopulatorfx.js';
import fs from 'fs';

let json = JSON.parse(fs.readFileSync("./boletin_ventas.json"));
let populator = new JsonDocPopulator();
let cliente = populator.getAttributes("outputs('HTTP')", json);
//fs.writeFileSync('./boletin_completer.json', JSON.stringify(cliente), 'utf-8');
//console.log("El archivo boletin_completer.json ha sido actualizado !");

console.log(populator.getByTrace(cliente,"proyecto>macroproyecto"))