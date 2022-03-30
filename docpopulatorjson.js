import fs from 'fs';
import JsonDocPopulator from './jsondocpopulatorfx.js';

let fileSchema = JSON.parse(fs.readFileSync("./dynamicFileSchema.json"));
let json = JSON.parse(fs.readFileSync("./boletin_ventas.json"));
let populator = new JsonDocPopulator();
let cliente = populator.getAttributes("triggerBody()", json);
let nuevo_json = '{';
//console.log(fileSchema.properties);
Object.keys(fileSchema.properties).forEach((tagName) => {

    let tag = fileSchema.properties[tagName];
    //console.log(tag);

    let title = tag['title'];
    if (title.includes(': Plan de pagos')) {
        let number = title.split(' ')[0];
        let concept = title.split(' ')[1];
        if (concept.includes(':')) {
            concept = 'entidad';
        }
        //populator.getByTrace(cliente, `proyecto>unidad>financiaci_n>plan_de_pagos>${number - 1}>${concept.toLowerCase()}`);
        nuevo_json += `"${tag['x-ms-property-name-alias']}" : "${populator.getByTrace(cliente, `proyecto>unidad>financiaci_n>plan_de_pagos>${number - 1}>${concept.toLowerCase()}`)}"`;
    }
});
nuevo_json = '}';
console.log(nuevo_json);