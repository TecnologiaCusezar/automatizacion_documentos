import fs from 'fs';
import JsonDocPopulator from './jsondocpopulatorfx.js';

let fileSchema = JSON.parse(fs.readFileSync("./dynamicFileSchema.json"));
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
let populator = new JsonDocPopulator();
let cliente = populator.getAttributes("triggerBody()", json);
let nuevo_json = '{';
//console.log(fileSchema.properties);
Object.keys(fileSchema.properties).forEach((tagName) => {

    let tag = fileSchema.properties[tagName];
    let title = tag['title'];
    if (title.includes(': Plan de pagos')) {
        let number = Number.parseInt(title.split(' ')[0].replace(')'));
        let concept = title.split(' ')[1].toLowerCase();
        let complement = 0;
        if (concept.includes(':')) {
            concept = 'entidad';
            complement = 0;
        }
        if (concept == 'día' || concept == 'mes' || concept == 'año') {
            complement = concept;
            concept = 'fecha';
        } else if (concept == 'valor') {
            complement = 2;
        }
        // console.log(`proyecto>unidad>financiaci_n>plan_de_pagos>${number - 1}>${concept}${(complement == null) ? '' : ('>' + complement)}"`);
        // console.log(`"${tag['x-ms-property-name-alias']}" : "${populator.getByTrace(cliente, `proyecto>unidad>financiaci_n>plan_de_pagos>${number - 1}>${concept}${(complement == null) ? '' : ('>' + complement)}`)}"`);
        nuevo_json += `"${tag['x-ms-property-name-alias']}" : "@${(concept == 'concepto') ? 'concat(' : ''}${populator.getByTrace(cliente, `proyecto>unidad>financiaci_n>plan_de_pagos>${number - 1}>${concept}${(complement == null) ? '' : ('>' + complement)}`)}${(concept == 'concepto') ? (',' + populator.getByTrace(cliente, `proyecto>unidad>financiaci_n>plan_de_pagos>${number - 1}>${concept}${(complement == null) ? '' : ('>' + complement)}`) + ')') : ''}",`;
    }
    if (title.includes('Opción-')) {
        let opciones_ingreso = [
            'Empleado',
            'Independiente',
            'Pensionado',
            'Hogar'
        ];
        let opciones_estado_civil = [
            'Soltero',
            'Unión Libre',
            'Casado',
            'Viudo',
            'Divorciado'
        ];
        let opciones_estado_civil_val = [
            'SO',
            'UL',
            'CV',
            'VI',
            'CD'
        ];
        let opciones_estado_civil_2 = [
            'Sociedad Marital Vigente',
            'Sociedad Marital Disuelta'
        ]
        let opciones_financiacion = [
            'Con crédito',
            'Sin crédito'
        ];
        let opciones_estado_civil_2_val = [
            'CV',
            'CD'
        ];
        let number = Number.parseInt(title.split(' ')[0].replace(')'));
        let concept = title.split('-')[1].split(':')[0];
        let complement = null;

        if (opciones_ingreso.indexOf(concept) != -1) {
            nuevo_json += `"${tag['x-ms-property-name-alias']}" : "@${populator.getByTrace(cliente, `compradores>${number - 1}>informacion_financiera>ingresos>0>actividad>1`).replace('+', concept).replace('%', 'X')}",`;
        } else if (opciones_estado_civil.indexOf(concept) != -1) {
            nuevo_json += `"${tag['x-ms-property-name-alias']}" : "@${populator.getByTrace(cliente, `compradores>${number - 1}>estado_civil>1`).replace('+', opciones_estado_civil_val[opciones_estado_civil.indexOf(concept)]).replace('%', 'X')}",`;
        } else if (opciones_estado_civil_2.indexOf(concept) != -1) {
            nuevo_json += `"${tag['x-ms-property-name-alias']}" : "@${populator.getByTrace(cliente, `compradores>${number - 1}>estado_civil>1`).replace('+', opciones_estado_civil_2_val[opciones_estado_civil_2.indexOf(concept)]).replace('%', 'X')}",`;
        } else {
            console.log(title);
        }

    }

    /*
    if(title.toLowerCase().includes('comprador')){
        let palabras = title.split(' ');
        let number = Number.parseInt(title.split(' ')[0].replace(')'));
        let concept = null;
        let complement = null;
        palabras.forEach((word)=>{

        });
    }*/
});
nuevo_json += '}';
console.log(nuevo_json);
fs.writeFileSync('new_dynamicFileSchema.json', nuevo_json);